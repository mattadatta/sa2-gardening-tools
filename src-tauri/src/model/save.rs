use sieve::Sieve;
use crate::model::types::*;
// use serde::{Deserialize, Serialize, Deserializer, Serializer, ser::SerializeStruct, de::MapAccess};

#[derive(Debug, Sieve)]
pub struct ChaoSave {
    #[sieve(offset(0x3AA4), stride(0x800), count(24))]
    chao: Vec<Chao>,
}

#[derive(Debug, Sieve)]
pub struct Chao {
    #[sieve(offset(0x12), count(7))]
    name: Vec<u8>,
    #[sieve(offset(0x20), stride(7))]
    bars: ChaoPropsU8,
    #[sieve(offset(0x28), stride(7))]
    grades: ChaoPropsU8,
    #[sieve(offset(0x30), stride(7))]
    levels: ChaoPropsU8,
    #[sieve(offset(0x38), stride(7))]
    points: ChaoPropsU16,
    #[sieve(offset(0x80), try_from)]
    chao_type: ChaoType,
    #[sieve(try_from)]
    chao_garden: ChaoGarden,
    happiness: i16,
    init_chao: u8,
    #[sieve(offset(0x8A))]
    lifespan_1: i16,
    lifespan_2: i16,
    reincarnations: u16,
    #[sieve(offset(0xA8))]
    run_to_power_transformation: f32,
    swim_to_fly_transformation: f32,
    alignment: f32,
    #[sieve(offset(0xC0))]
    transformation_magnitude: f32,
    #[sieve(offset(0xD1), try_from)]
    eyes: ChaoEyes,
    #[sieve(try_from)]
    mouth: ChaoMouth,
    #[sieve(try_from)]
    emotiball: ChaoEmotiball,
    #[sieve(offset(0xD5), try_from)]
    hat: ChaoHat,
    feet_hidden: bool,
    #[sieve(try_from)]
    medal: ChaoMedal,
    #[sieve(try_from)]
    color: ChaoColor,
    monotone: bool,
    #[sieve(try_from)]
    texture: ChaoTexture,
    shiny: bool,
    #[sieve(try_from)]
    egg_color: ChaoEggColor,
    #[sieve(try_from)]
    body_type: ChaoBodyType,
    #[sieve(try_from)]
    body_type_animal: ChaoAnimal,
    #[sieve(offset(0x118), try_from(u32))]
    sa2_animal_behaviors: SA2AnimalBehaviors,
    #[sieve(stride(8))]
    body_parts: ChaoBodyParts,
    #[sieve(offset(0x12C))]
    joy: u8,
    #[sieve(offset(0x12E))]
    urge_to_cry: u8,
    fear: u8,
    #[sieve(offset(0x131))]
    dizziness: u8,
    #[sieve(offset(0x134))]
    sleepiness: u16,
    tiredness: u16,
    hunger: u16,
    desire_to_mate: u16,
    boredom: u16,
    #[sieve(offset(0x148))]
    energy: u16,
    #[sieve(offset(0x14A))]
    normal_to_curious: i8,
    #[sieve(offset(0x14C))]
    cry_baby_to_energetic: i8,
    naive_to_normal: i8,
    #[sieve(offset(0x150))]
    normal_to_big_eater: i8,
    #[sieve(offset(0x155))]
    normal_to_care_free: i8,
    #[sieve(offset(0x157), try_from)]
    favorite_fruit: FavoriteFruit,
    #[sieve(offset(0x15A))]
    cough: i8,
    cold: i8,
    rash: i8,
    runny_nose: i8,
    hiccups: i8,
    stomach_ache: i8,
    #[sieve(try_from(u32))]
    classroom_skills: ClassroomSkills,
    #[sieve(try_from(u32))]
    toys: Toys,
    #[sieve(stride(0x6))]
    sonic_bond: ChaoBond,
    #[sieve(stride(0x6))]
    shadow_bond: ChaoBond,
    #[sieve(stride(0x6))]
    tails_bond: ChaoBond,
    #[sieve(stride(0x6))]
    eggman_bond: ChaoBond,
    #[sieve(stride(0x6))]
    knuckles_bond: ChaoBond,
    #[sieve(stride(0x6))]
    rouge_bond: ChaoBond,
    #[sieve(offset(0x438))]
    reset_trigger: bool,
    #[sieve(offset(0x494), stride(0))]
    dna_stat_grades: ChaoDnaStatGrades,
    #[sieve(offset(0x4C6), stride(0))]
    dna_props: ChaoDnaProps,
    #[sieve(offset(0x4E0), try_from(u32))]
    sa_animal_behaviors: SAAnimalBehaviors,
}

impl Chao {
    pub fn name_as_str(&self) -> String {
        // self.data.iter().map(|b|
        //     *CHAO_STRING_MAPPINGS.get_by_right(&b).unwrap_or(&' ')
        // ).collect()
        self.name.iter().map(|b| chao_byte_to_char(*b).unwrap_or('_')).collect()
    }

    pub fn as_str_set_name(&mut self, value: String) {
        // input.chars().map(|c|
        //     *CHAO_STRING_MAPPINGS.get_by_left(&c).unwrap_or(&0)
        // ).collect()
        self.name = value.chars().map(|c| chao_char_to_byte(c).unwrap_or(0x3F)).collect();
        
    }
}

#[derive(Debug, Sieve)]
pub struct ChaoPropsU8 {
    swim: u8,
    fly: u8,
    run: u8,
    power: u8,
    stamina: u8,
    luck: u8,
    intelligence: u8,
}

#[derive(Debug, Sieve)]
pub struct ChaoPropsU16 {
    swim: u16,
    fly: u16,
    run: u16,
    power: u16,
    stamina: u16,
    luck: u16,
    intelligence: u16,
}


#[derive(Debug, Sieve)]
#[sieve(try_from)]
pub struct ChaoBodyParts {
    arms: ChaoAnimalPartArms,
    ears: ChaoAnimalPartEars,
    forehead: ChaoAnimalPartForehead,
    horns: ChaoAnimalPartHorns,
    legs: ChaoAnimalPartLegs,
    tail: ChaoAnimalPartTail,
    wings: ChaoAnimalPartWings,
    face: ChaoAnimalPartFace,
}

#[derive(Debug, Sieve)]
pub struct ChaoBond {
    bond: i8,
}

#[derive(Debug, Sieve)]
pub struct ChaoDnaStatGrades {
    swim_1: u8,
    swim_2: u8,
    fly_1: u8,
    fly_2: u8,
    run_1: u8,
    run_2: u8,
    power_1: u8,
    power_2: u8,
    stamina_1: u8,
    stamina_2: u8,
    luck_1: u8,
    luck_2: u8,
    intelligence_1: u8,
    intelligence_2: u8,
}

#[derive(Debug, Sieve)]
pub struct ChaoDnaProps {
    #[sieve(try_from)]
    favorite_fruit_1: FavoriteFruit,
    #[sieve(try_from)]
    favorite_fruit_2: FavoriteFruit,
    #[sieve(offset(0x6), try_from)] // _offset_(0x4CC)
    color_1: ChaoColor,
    #[sieve(try_from)]
    color_2: ChaoColor,
    monotone_1: bool,
    monotone_2: bool,
    #[sieve(try_from)]
    texture_1: ChaoTexture,
    #[sieve(try_from)]
    texture_2: ChaoTexture,
    shiny_1: bool,
    shiny_2: bool,
    #[sieve(try_from)]
    egg_color_1: ChaoEggColor,
    #[sieve(try_from)]
    egg_color_2: ChaoEggColor,
}
