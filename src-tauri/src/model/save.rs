use cursieve::Sieve;
use crate::model::types::*;
use serde::{Serialize, Deserialize};

#[derive(Debug, Sieve, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ChaoSave {
    // #[sieve(offset(0x3A50))]
    // pub market_count: u8,
    // #[sieve(offset(0x3A54))]
    // pub held_count: u8,
    #[sieve(offset(0x3AA4), stride(0x800), count(24))]
    pub chao: Vec<Chao>,
}

#[derive(Debug, Sieve, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Chao {
    #[sieve(offset(0x12), count(7))]
    pub name: Vec<u8>,
    #[sieve(offset(0x20), stride(7))]
    pub bars: ChaoPropsU8,
    #[sieve(offset(0x28), stride(7))]
    pub grades: ChaoPropsU8,
    #[sieve(offset(0x30), stride(7))]
    pub levels: ChaoPropsU8,
    #[sieve(offset(0x38), stride(7))]
    pub points: ChaoPropsU16,
    #[sieve(offset(0x80), try_from)]
    pub chao_type: ChaoType,
    #[sieve(try_from)]
    pub garden: ChaoGarden,
    pub happiness: i16,
    pub init_chao: u8,
    #[sieve(offset(0x8A))]
    pub lifespan_1: i16,
    pub lifespan_2: i16,
    pub reincarnations: u16,
    #[sieve(offset(0xA8))]
    pub run_to_power_transformation: f32,
    pub swim_to_fly_transformation: f32,
    pub alignment: f32,
    #[sieve(offset(0xC0))]
    pub transformation_magnitude: f32,
    #[sieve(offset(0xD1), try_from)]
    pub eyes: ChaoEyes,
    #[sieve(try_from)]
    pub mouth: ChaoMouth,
    #[sieve(try_from)]
    pub emotiball: ChaoEmotiball,
    #[sieve(offset(0xD5), try_from)]
    pub hat: ChaoHat,
    pub feet_hidden: bool,
    #[sieve(try_from)]
    pub medal: ChaoMedal,
    #[sieve(try_from)]
    pub color: ChaoColor,
    pub monotone: bool,
    #[sieve(try_from)]
    pub texture: ChaoTexture,
    pub shiny: bool,
    #[sieve(try_from)]
    pub egg_color: ChaoEggColor,
    #[sieve(try_from)]
    pub body_type: ChaoBodyType,
    #[sieve(try_from)]
    pub body_type_animal: ChaoAnimal,
    #[sieve(offset(0x118), try_from(u32))]
    pub sa2_animal_behaviors: ChaoSa2AnimalBehaviors,
    #[sieve(stride(8))]
    pub body_parts: ChaoBodyParts,
    #[sieve(offset(0x12C))]
    pub joy: u8,
    #[sieve(offset(0x12E))]
    pub urge_to_cry: u8,
    pub fear: u8,
    #[sieve(offset(0x131))]
    pub dizziness: u8,
    #[sieve(offset(0x134))]
    pub sleepiness: u16,
    pub tiredness: u16,
    pub hunger: u16,
    pub desire_to_mate: u16,
    pub boredom: u16,
    #[sieve(offset(0x148))]
    pub energy: u16,
    #[sieve(offset(0x14A))]
    pub normal_to_curious: i8,
    #[sieve(offset(0x14C))]
    pub cry_baby_to_energetic: i8,
    pub naive_to_normal: i8,
    #[sieve(offset(0x150))]
    pub normal_to_big_eater: i8,
    #[sieve(offset(0x155))]
    pub normal_to_care_free: i8,
    #[sieve(offset(0x157), try_from)]
    pub favorite_fruit: ChaoFavoriteFruit,
    #[sieve(offset(0x15A))]
    pub cough: i8,
    pub cold: i8,
    pub rash: i8,
    pub runny_nose: i8,
    pub hiccups: i8,
    pub stomach_ache: i8,
    #[sieve(try_from(u32))]
    pub classroom_skills: ChaoClassroomSkills,
    #[sieve(try_from(u32))]
    pub toys: ChaoToys,
    #[sieve(stride(0x6))]
    pub sonic_bond: ChaoBond,
    #[sieve(stride(0x6))]
    pub shadow_bond: ChaoBond,
    #[sieve(stride(0x6))]
    pub tails_bond: ChaoBond,
    #[sieve(stride(0x6))]
    pub eggman_bond: ChaoBond,
    #[sieve(stride(0x6))]
    pub knuckles_bond: ChaoBond,
    #[sieve(stride(0x6))]
    pub rouge_bond: ChaoBond,
    #[sieve(offset(0x438))]
    pub reset_trigger: bool,
    #[sieve(offset(0x494), stride(0))]
    pub dna_stat_grades: ChaoDnaStatGrades,
    #[sieve(offset(0x4C6), stride(0))]
    pub dna_props: ChaoDnaProps,
    #[sieve(offset(0x4E0), try_from(u32))]
    pub sa_animal_behaviors: ChaoSaAnimalBehaviors,
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

#[derive(Debug, Sieve, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ChaoPropsU8 {
    pub swim: u8,
    pub fly: u8,
    pub run: u8,
    pub power: u8,
    pub stamina: u8,
    pub luck: u8,
    pub intelligence: u8,
}

#[derive(Debug, Sieve, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ChaoPropsU16 {
    pub swim: u16,
    pub fly: u16,
    pub run: u16,
    pub power: u16,
    pub stamina: u16,
    pub luck: u16,
    pub intelligence: u16,
}


#[derive(Debug, Sieve, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
#[sieve(try_from)]
pub struct ChaoBodyParts {
    pub arms: ChaoAnimalPartArms,
    pub ears: ChaoAnimalPartEars,
    pub forehead: ChaoAnimalPartForehead,
    pub horns: ChaoAnimalPartHorns,
    pub legs: ChaoAnimalPartLegs,
    pub tail: ChaoAnimalPartTail,
    pub wings: ChaoAnimalPartWings,
    pub face: ChaoAnimalPartFace,
}

#[derive(Debug, Sieve, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ChaoBond {
    pub bond: i8,
}

#[derive(Debug, Sieve, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ChaoDnaStatGrades {
    pub swim_1: u8,
    pub swim_2: u8,
    pub fly_1: u8,
    pub fly_2: u8,
    pub run_1: u8,
    pub run_2: u8,
    pub power_1: u8,
    pub power_2: u8,
    pub stamina_1: u8,
    pub stamina_2: u8,
    pub luck_1: u8,
    pub luck_2: u8,
    pub intelligence_1: u8,
    pub intelligence_2: u8,
}

#[derive(Debug, Sieve, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ChaoDnaProps {
    #[sieve(try_from)]
    pub favorite_fruit_1: ChaoFavoriteFruit,
    #[sieve(try_from)]
    pub favorite_fruit_2: ChaoFavoriteFruit,
    #[sieve(offset(0x6), try_from)] // _offset_(0x4CC)
    pub color_1: ChaoColor,
    #[sieve(try_from)]
    pub color_2: ChaoColor,
    pub monotone_1: bool,
    pub monotone_2: bool,
    #[sieve(try_from)]
    pub texture_1: ChaoTexture,
    #[sieve(try_from)]
    pub texture_2: ChaoTexture,
    pub shiny_1: bool,
    pub shiny_2: bool,
    #[sieve(try_from)]
    pub egg_color_1: ChaoEggColor,
    #[sieve(try_from)]
    pub egg_color_2: ChaoEggColor,
}
