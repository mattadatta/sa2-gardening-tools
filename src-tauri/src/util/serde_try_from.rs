#[macro_export]
macro_rules! serde_try_from {
    ($name:ident, $type:ty) => {
        impl serde::ser::Serialize for $name {
            fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error> where S: serde::ser::Serializer {
                let value = <$type as std::convert::TryFrom<$name>>::try_from(*self).map_err(serde::ser::Error::custom)?;
                serde::ser::Serialize::serialize(&value, serializer)
            }
        }

        impl<'de> serde::de::Deserialize<'de> for $name {
            fn deserialize<D>(deserializer: D) -> Result<Self, D::Error> where D: serde::de::Deserializer<'de> {
                let value = <$type as serde::de::Deserialize>::deserialize(deserializer)?;
                <$name as std::convert::TryFrom<$type>>::try_from(value).map_err(|_| serde::de::Error::custom(format!("Failed to {:?}::try_from({:?}) as {:?}", stringify!($type), value, stringify!($name))))
            }
        }
    };
}
