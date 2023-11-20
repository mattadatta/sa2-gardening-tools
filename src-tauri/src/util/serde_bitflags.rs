#[macro_export]
macro_rules! serde_bitflags {
    ($name:ident, $type:ty) => {
        impl serde::ser::Serialize for $name {
            fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error> where S: serde::ser::Serializer {
                serde::ser::Serialize::serialize(&self.bits(), serializer)
            }
        }

        impl<'de> serde::de::Deserialize<'de> for $name {
            fn deserialize<D>(deserializer: D) -> Result<Self, D::Error> where D: serde::de::Deserializer<'de> {
                Ok(Self::from_bits_retain(<$type as serde::de::Deserialize>::deserialize(deserializer)?))
            }
        }
    };
}
