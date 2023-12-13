use crate::crypto;

#[derive(Debug)]
pub struct UnpackedSave {
    pub data: Vec<u8>,
}

impl UnpackedSave {
    pub fn unpack(buf: &[u8]) -> Result<Self, UnpackError> {
        Ok(Self { data: buf.to_vec() })
    }

    pub fn pack(&mut self) -> Result<Vec<u8>, PackError> {
        crypto::checksum(&mut self.data);
        Ok(self.data.clone())
    }
}

#[derive(thiserror::Error, Debug)]
pub enum UnpackError {
    #[error("cursieve error: {0}")]
    CursieveError(#[from] cursieve::Error),
    #[error("i/o error: `{0}`")]
    IoError(#[from] std::io::Error),
    #[error("{0} crc `{1}` does not match computed crc `{2}`")]
    CrcMismatch(String, u32, u32),
}

impl From<UnpackError> for String {
    fn from(value: UnpackError) -> Self {
        format!("{}", value)
    }
}

#[derive(thiserror::Error, Debug)]
pub enum PackError {
    #[error("cursieve error")]
    CursieveError(#[from] cursieve::Error),
    #[error("i/o error")]
    IoError(#[from] std::io::Error),
}

impl From<PackError> for String {
    fn from(value: PackError) -> Self {
        format!("{}", value)
    }
}
