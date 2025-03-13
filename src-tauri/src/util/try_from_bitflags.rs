#[macro_export]
macro_rules! try_from_bitflags {
    ($name:ident, $type:ty) => {
        impl std::convert::TryFrom<$type> for $name {
            type Error = ();

            fn try_from(v: $type) -> Result<Self, Self::Error> {
                Ok(Self::from_bits_retain(v))
            }
        }

        impl std::convert::From<$name> for $type {
            fn from(v: $name) -> Self {
                v.bits()
            }
        }
    };
}
