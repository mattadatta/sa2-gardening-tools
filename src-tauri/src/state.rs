use crate::logic::LoadedInstance;

#[derive(Default)]
pub struct State {
    pub instance: Option<LoadedInstance>,
}
