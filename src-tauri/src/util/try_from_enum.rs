// Based on: https://stackoverflow.com/a/57578431
#[macro_export]
macro_rules! try_from_enum {
    ($(#[$meta:meta])* $vis:vis enum $name:ident : $ty:ty {
        $($(#[$vmeta:meta])* $vname:ident $(= $val:expr)?,)*
    }) => {
        $(#[$meta])*
        $vis enum $name {
            $($(#[$vmeta])* $vname $(= $val)?,)*
        }

        impl std::convert::TryFrom<$ty> for $name {
            type Error = ();

            fn try_from(v: $ty) -> Result<Self, Self::Error> {
                match v {
                    $(x if x == $name::$vname as $ty => Ok($name::$vname),)*
                    _ => Err(()),
                }
            }
        }

        impl std::convert::From<$name> for $ty {
            fn from(v: $name) -> Self {
                v as $ty
            }
        }
    };
    ($(#[$meta:meta])* $vis:vis enum $name:ident {
        $($(#[$vmeta:meta])* $vname:ident $(= $val:expr)?,)*
    }) => {
        try_from_enum! {
            $(#[$meta])*
            $vis enum $name: i32 {
                $($(#[$vmeta])* $vname $(= $val)?,)*
            }
        }
    };
}
