use cursieve::{Sieve, SieveDisperse, SieveSift};
use serde::{Deserialize, Serialize};

use crate::model::{save_pack::UnpackedSave, types::*};

#[derive(Debug, Sieve, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ChaoSave {
    #[sieve(offset(0x304C), try_from(u32))]
    pub portals: ChaoPortals,
    // #[sieve(offset(0x3A50))]
    // pub market_count: u8,
    // #[sieve(offset(0x3A54))]
    // pub held_count: u8,
    #[sieve(offset(0x3AA4), stride(0x800), count(24))]
    pub chao: Vec<Chao>,
}

impl ChaoSave {
    pub fn from_unpacked(save: &UnpackedSave) -> Result<Self, cursieve::Error> {
        Self::sift(&save.data)
    }

    pub fn to_unpacked(&self, save: &mut UnpackedSave) -> Result<(), cursieve::Error> {
        self.disperse(&mut save.data)
    }
}

#[derive(Debug, Sieve, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Chao {
    #[sieve(offset(0), stride(0x0))]
    pub unknowns: ChaoUnknowns,
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
    pub anger: u8,
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
    pub normal_to_carefree: i8,
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
    #[sieve(offset(0x16C), stride(0x6))]
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
    pub fn create() -> Self {
        Self {
            unknowns: ChaoUnknowns::new(),
            name: vec![0; 7],
            bars: Default::default(),
            grades: Default::default(),
            levels: Default::default(),
            points: Default::default(),
            chao_type: ChaoType::Egg,
            garden: ChaoGarden::NeutralGarden,
            happiness: 0,
            init_chao: 255,
            lifespan_1: 3600,
            lifespan_2: 3600,
            reincarnations: 0,
            run_to_power_transformation: 0.0,
            swim_to_fly_transformation: 0.0,
            alignment: 0.0,
            transformation_magnitude: 0.0,
            eyes: ChaoEyes::Normal,
            mouth: ChaoMouth::None,
            emotiball: ChaoEmotiball::Normal,
            hat: ChaoHat::None,
            feet_hidden: false,
            medal: ChaoMedal::None,
            color: ChaoColor::Normal,
            monotone: false,
            texture: ChaoTexture::None,
            shiny: false,
            egg_color: ChaoEggColor::Normal,
            body_type: ChaoBodyType::Normal,
            body_type_animal: ChaoAnimal::Penguin,
            sa2_animal_behaviors: ChaoSa2AnimalBehaviors::from_bits_retain(0),
            body_parts: ChaoBodyParts::create(),
            joy: 0,
            anger: 0,
            urge_to_cry: 0,
            fear: 0,
            dizziness: 0,
            sleepiness: 0,
            tiredness: 0,
            hunger: 0,
            desire_to_mate: 0,
            boredom: 0,
            energy: 0,
            normal_to_curious: 0,
            cry_baby_to_energetic: 0,
            naive_to_normal: 0,
            normal_to_big_eater: 0,
            normal_to_carefree: 0,
            favorite_fruit: ChaoFavoriteFruit::RoundFruit1,
            cough: 0,
            cold: 0,
            rash: 0,
            runny_nose: 0,
            hiccups: 0,
            stomach_ache: 0,
            classroom_skills: ChaoClassroomSkills::from_bits_retain(0),
            toys: ChaoToys::from_bits_retain(0),
            sonic_bond: Default::default(),
            shadow_bond: Default::default(),
            tails_bond: Default::default(),
            eggman_bond: Default::default(),
            knuckles_bond: Default::default(),
            rouge_bond: Default::default(),
            reset_trigger: true,
            dna_stat_grades: Default::default(),
            dna_props: Default::default(),
            sa_animal_behaviors: ChaoSaAnimalBehaviors::from_bits_retain(0),
        }
    }

    pub fn deleted() -> Self {
        Self {
            unknowns: Default::default(),
            name: vec![0; 7],
            bars: Default::default(),
            grades: Default::default(),
            levels: Default::default(),
            points: Default::default(),
            chao_type: ChaoType::Empty,
            garden: ChaoGarden::None,
            happiness: 0,
            init_chao: 0,
            lifespan_1: 0,
            lifespan_2: 0,
            reincarnations: 0,
            run_to_power_transformation: 0.0,
            swim_to_fly_transformation: 0.0,
            alignment: 0.0,
            transformation_magnitude: 0.0,
            eyes: ChaoEyes::Normal,
            mouth: ChaoMouth::None,
            emotiball: ChaoEmotiball::Normal,
            hat: ChaoHat::None,
            feet_hidden: false,
            medal: ChaoMedal::None,
            color: ChaoColor::Normal,
            monotone: false,
            texture: ChaoTexture::None,
            shiny: false,
            egg_color: ChaoEggColor::Normal,
            body_type: ChaoBodyType::Normal,
            body_type_animal: ChaoAnimal::Penguin,
            sa2_animal_behaviors: ChaoSa2AnimalBehaviors::from_bits_retain(0),
            body_parts: ChaoBodyParts::deleted(),
            joy: 0,
            anger: 0,
            urge_to_cry: 0,
            fear: 0,
            dizziness: 0,
            sleepiness: 0,
            tiredness: 0,
            hunger: 0,
            desire_to_mate: 0,
            boredom: 0,
            energy: 0,
            normal_to_curious: 0,
            cry_baby_to_energetic: 0,
            naive_to_normal: 0,
            normal_to_big_eater: 0,
            normal_to_carefree: 0,
            favorite_fruit: ChaoFavoriteFruit::RoundFruit1,
            cough: 0,
            cold: 0,
            rash: 0,
            runny_nose: 0,
            hiccups: 0,
            stomach_ache: 0,
            classroom_skills: ChaoClassroomSkills::from_bits_retain(0),
            toys: ChaoToys::from_bits_retain(0),
            sonic_bond: Default::default(),
            shadow_bond: Default::default(),
            tails_bond: Default::default(),
            eggman_bond: Default::default(),
            knuckles_bond: Default::default(),
            rouge_bond: Default::default(),
            reset_trigger: false,
            dna_stat_grades: Default::default(),
            dna_props: Default::default(),
            sa_animal_behaviors: ChaoSaAnimalBehaviors::from_bits_retain(0),
        }
    }
}

impl Chao {
    pub fn name_as_str(&self) -> String {
        // self.data.iter().map(|b|
        //     *CHAO_STRING_MAPPINGS.get_by_right(&b).unwrap_or(&' ')
        // ).collect()
        self.name
            .iter()
            .map(|b| chao_byte_to_char(*b).unwrap_or('_'))
            .collect()
    }

    pub fn as_str_set_name(&mut self, value: String) {
        // input.chars().map(|c|
        //     *CHAO_STRING_MAPPINGS.get_by_left(&c).unwrap_or(&0)
        // ).collect()
        self.name = value
            .chars()
            .map(|c| chao_char_to_byte(c).unwrap_or(0x3F))
            .collect();
    }
}

#[derive(Debug, Default, Sieve, Serialize, Deserialize)]
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

#[derive(Debug, Default, Sieve, Serialize, Deserialize)]
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

impl ChaoBodyParts {
    fn create() -> Self {
        Self {
            arms: ChaoAnimalPartArms::None,
            ears: ChaoAnimalPartEars::None,
            forehead: ChaoAnimalPartForehead::None,
            horns: ChaoAnimalPartHorns::None,
            legs: ChaoAnimalPartLegs::None,
            tail: ChaoAnimalPartTail::None,
            wings: ChaoAnimalPartWings::None,
            face: ChaoAnimalPartFace::None,
        }
    }

    fn deleted() -> Self {
        Self {
            arms: ChaoAnimalPartArms::Penguin,
            ears: ChaoAnimalPartEars::Invalid,
            forehead: ChaoAnimalPartForehead::Penguin,
            horns: ChaoAnimalPartHorns::Invalid,
            legs: ChaoAnimalPartLegs::Penguin,
            tail: ChaoAnimalPartTail::Invalid,
            wings: ChaoAnimalPartWings::Invalid,
            face: ChaoAnimalPartFace::Invalid,
        }
    }
}

#[derive(Debug, Default, Sieve, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ChaoBond {
    pub bond: i8,
    // pub stat2: i8,
    // pub stat3: i8,
    // pub stat4: i8,
    // pub stat5: i8,
    // pub always_zero: u8,
}

#[derive(Debug, Default, Sieve, Serialize, Deserialize)]
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

impl Default for ChaoDnaProps {
    fn default() -> Self {
        Self {
            favorite_fruit_1: ChaoFavoriteFruit::RoundFruit1,
            favorite_fruit_2: ChaoFavoriteFruit::RoundFruit1,
            color_1: ChaoColor::Normal,
            color_2: ChaoColor::Normal,
            monotone_1: false,
            monotone_2: false,
            texture_1: ChaoTexture::None,
            texture_2: ChaoTexture::None,
            shiny_1: false,
            shiny_2: false,
            egg_color_1: ChaoEggColor::Normal,
            egg_color_2: ChaoEggColor::Normal,
        }
    }
}

#[derive(Debug, Sieve, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ChaoUnknowns {
    #[sieve(offset(0x78))]
    pub field_01: u32,
    #[sieve(offset(0x86))]
    pub field_02: u16,
    #[sieve(offset(0x88))]
    pub field_03: u16,
    #[sieve(offset(0x90))]
    pub field_04: u32,
    #[sieve(offset(0x98))]
    pub field_05: u32,
    #[sieve(offset(0xA0))]
    pub field_06: u32,
    #[sieve(offset(0xA4))]
    pub field_07: u32,
    #[sieve(offset(0xBC))]
    pub field_08: u32,
    #[sieve(offset(0x10E))]
    pub field_09: u16,
    #[sieve(offset(0x110))]
    pub field_10: u16,
    #[sieve(offset(0x126))]
    pub field_11: u16,
    #[sieve(offset(0x128))]
    pub field_12: u16,
    #[sieve(offset(0x12A))]
    pub field_13: u16,
    #[sieve(offset(0x13E))]
    pub field_14: u16,
    #[sieve(offset(0x140))]
    pub field_15: u16,
    #[sieve(offset(0x16E))]
    pub field_16: u16,
    #[sieve(offset(0x174))]
    pub field_17: u16,
    #[sieve(offset(0x17A))]
    pub field_18: u16,
    #[sieve(offset(0x180))]
    pub field_19: u16,
    #[sieve(offset(0x182))]
    pub field_20: u16,
    #[sieve(offset(0x186))]
    pub field_21: u16,
    #[sieve(offset(0x188))]
    pub field_22: u16,
    #[sieve(offset(0x18C))]
    pub field_23: u16,
    #[sieve(offset(0x1A6))]
    pub field_24: u16,
    #[sieve(offset(0x1C2))]
    pub field_25: u16,
    #[sieve(offset(0x1DE))]
    pub field_26: u16,
    #[sieve(offset(0x1FA))]
    pub field_27: u16,
    #[sieve(offset(0x216))]
    pub field_28: u16,
    #[sieve(offset(0x232))]
    pub field_29: u16,
    #[sieve(offset(0x24E))]
    pub field_30: u16,
    #[sieve(offset(0x26A))]
    pub field_31: u16,
    #[sieve(offset(0x286))]
    pub field_32: u16,
    #[sieve(offset(0x2A2))]
    pub field_33: u16,
    #[sieve(offset(0x2BE))]
    pub field_34: u16,
    #[sieve(offset(0x2DA))]
    pub field_35: u16,
    #[sieve(offset(0x2F6))]
    pub field_36: u16,
    #[sieve(offset(0x312))]
    pub field_37: u16,
    #[sieve(offset(0x32E))]
    pub field_38: u16,
    #[sieve(offset(0x34A))]
    pub field_39: u16,
    #[sieve(offset(0x366))]
    pub field_40: u16,
    #[sieve(offset(0x382))]
    pub field_41: u16,
    #[sieve(offset(0x39E))]
    pub field_42: u16,
    #[sieve(offset(0x3BA))]
    pub field_43: u16,
}

impl Default for ChaoUnknowns {
    fn default() -> Self {
        Self {
            field_01: 0,
            field_02: 0,
            field_03: 0,
            field_04: 0,
            field_05: 0,
            field_06: 0,
            field_07: 0,
            field_08: 0,
            field_09: 0,
            field_10: 0,
            field_11: 0,
            field_12: 0,
            field_13: 0,
            field_14: 0,
            field_15: 0,
            field_16: 0,
            field_17: 0,
            field_18: 0,
            field_19: 0,
            field_20: 0,
            field_21: 0,
            field_22: 0,
            field_23: 0,
            field_24: 0,
            field_25: 0,
            field_26: 0,
            field_27: 0,
            field_28: 0,
            field_29: 0,
            field_30: 0,
            field_31: 0,
            field_32: 0,
            field_33: 0,
            field_34: 0,
            field_35: 0,
            field_36: 0,
            field_37: 0,
            field_38: 0,
            field_39: 0,
            field_40: 0,
            field_41: 0,
            field_42: 0,
            field_43: 0,
        }
    }
}

impl ChaoUnknowns {
    fn new() -> Self {
        Self {
            field_01: 0,
            field_02: 0,
            field_03: 0,
            field_04: 0,
            field_05: 0,
            field_06: 1,
            field_07: 10,
            field_08: 0,
            field_09: 0,
            field_10: 0,
            field_11: 2,
            field_12: 10,
            field_13: 10,
            field_14: 0,
            field_15: 0,
            field_16: 0,
            field_17: 0,
            field_18: 0,
            field_19: 0,
            field_20: 0,
            field_21: 0,
            field_22: 0,
            field_23: 0,
            field_24: 0,
            field_25: 0,
            field_26: 0,
            field_27: 0,
            field_28: 0,
            field_29: 0,
            field_30: 0,
            field_31: 0,
            field_32: 0,
            field_33: 0,
            field_34: 0,
            field_35: 0,
            field_36: 0,
            field_37: 0,
            field_38: 0,
            field_39: 0,
            field_40: 0,
            field_41: 0,
            field_42: 0,
            field_43: 0,
        }
    }
}
