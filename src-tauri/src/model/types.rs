use bimap::BiMap;
use bitflags::bitflags;
use lazy_static::lazy_static;
use strum_macros::EnumIter;
use ts_rs::TS;

use crate::{try_from_enum, try_from_bitflags, serde_try_from};

try_from_enum! {
    #[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, EnumIter, TS)]
    #[ts(export, export_to = "../src/gen/model/types/ChaoColor.ts")]
    pub enum ChaoColor: u8 {
        Normal = 0,
        Yellow,
        White,
        Brown,
        SkyBlue,
        Pink,
        Blue,
        Grey,
        Green,
        Red,
        LimeGreen,
        Purple,
        Orange,
        Black,
        UNUSED1,
        UNUSED2,
        UNUSED3,
        TransparentPurple,
        UNUSED4,
        UNUSED5,
        UNUSED6,
        PowderBlue,
        UNUSED7,
        UNUSED8,
        UNUSED9,
        UNUSED10,
        UNUSED11,
        UNUSED12,
        UNUSED13,
        UNUSEDWhite,
        DarkerGrey,
        UNUSED14,
        UNUSED15,
        UNUSED16,
        UNUSED17,
        UNUSED18,
        UNUSED19,
        UNUSED20,
        UNUSED21,
        UNUSED22,
        UNUSED23,
        UNUSED24,
        UNUSED25,
        UNUSED26,
        UNUSED27,
        UNUSED28,
        UNUSED29,
        UNUSED30,
        UNUSED31,
        UNUSED32,
        UNUSED33,
        UNUSED34,
        UNUSED35,
        UNUSED36,
        UNUSED37,
        UNUSED38,
        UNUSED39,
        UNUSED40,
        UNUSED41,
        UNUSED42,
        UNUSED43,
        UNUSED44,
        UNUSED45,
        UNUSED46,
        UNUSED47,
        UNUSED48,
        UNUSED49,
        UNUSED50,
        UNUSED51,
        UNUSED52,
        UNUSED53,
        UNUSED54,
        UNUSED55,
        UNUSED56,
        UNUSED57,
        UNUSED58,
        UNUSED59,
        UNUSED60,
        UNUSED61,
        UNUSED62,
        UNUSED63,
        UNUSED64,
        DeepDarkBlue,
        UNUSED65,
        UNUSED66,
        UNUSED67,
        UNUSED68,
        UNUSED69,
        UNUSED70,
        UNUSED71,
        UNUSED72,
        UNUSED73,
        UNUSED74,
        UNUSED75,
        UNUSED76,
        UNUSED77,
        UNUSED78,
        UNUSED79,
        UNUSED80,
        UNUSED81,
        UNUSED82,
        UNUSED83,
        UNUSED84,
        UNUSED85,
        UNUSED86,
        UNUSED87,
        UNUSED88,
        UNUSED89,
        UNUSED90,
        UNUSED91,
        UNUSED92,
        UNUSED93,
        UNUSED94,
        UNUSED95,
        UNUSED96,
        UNUSED97,
        UNUSED98,
        UNUSED99,
        UNUSED100,
        UNUSED101,
        TRANSPARENTPowderBlue,
        UNUSED102,
        UNUSED103,
        TRANSPARENTDarkOliveGreen,
        UNUSED104,
        UNUSED105,
        UNUSED106,
        TRANSPARENTDarkGrey,
        TRANSPARENTSeaGreen,
        UNUSED107,
        UNUSED108,
        TRANSPARENTMediumGoldenrod,
        UNUSED109,
        TRANSPARENTIndianRed,
        UNUSED110,
        UNUSED111,
        UNUSED112,
        UNUSED113,
        UNUSED114,
        TRANSPARENTSpringGreen,
        TRANSPARENTLightCoral,
        UNUSED115,
        UNUSED116,
        TRANSPARENTPaleTurquoise,
        UNUSED117,
        TRANSPARENTDarkPurple,
        TRANSPARENTSlateBlue,
        TRANSPARENTLightGreen,
        UNUSED118,
        TRANSPARENTTan,
        UNUSED119,
        TRANSPARENTHotPink,
        TRANSPARENTWheat,
        TRANSPARENTDarkSlateBlue,
        UNUSED120,
        TRANSPARENTBurlywood,
        UNUSED121,
        TRANSPARENTCrimson,
        UNUSED122,
        UNUSED123,
        UNUSED124,
        UNUSED125,
        UNUSED126,
        TRANSPARENTMediumSeaGreen,
        UNUSED127,
        TRANSPARENTMediumPurple,
        UNUSED128,
        UNUSED129,
        UNUSED130,
        TRANSPARENTForestGreen,
        UNUSED131,
        TRANSPARENTPlum,
        UNUSED132,
        UNUSED133,
        UNUSED134,
        TRANSPARENTAquamarine,
        TRANSPARENTMediumOrchid,
        TRANSPARENTSalmon,
        TRANSPARENTDarkOlive,
        UNUSED135,
        UNUSED136,
        TRANSPARENTLightAquamarine,
        UNUSED137,
        TRANSPARENTOliveDrab,
        TRANSPARENTDarkOliveGreenGrey,
        UNUSED138,
        UNUSED139,
        TRANSPARENTPaleVioletRed,
        UNUSED140,
        TRANSPARENTLightPaleGreen,
        TRANSPARENTGoldenrod,
        TRANSPARENTDarkViolet,
        UNUSED141,
        TRANSPARENTPaleGoldenrod,
        UNUSED142,
        UNUSED143,
        TRANSPARENTBlueViolet,
        UNUSED144,
        UNUSED145,
        TRANSPARENTMediumTurquoise,
        TRANSPARENTGreen,
        UNUSED146,
        TRANSPARENTViolet,
        TRANSPARENTPink,
        UNUSED147,
        TRANSPARENTPaleGreen,
        UNUSED148,
        TRANSPARENTDarkSeaGreen,
        UNUSED149,
        UNUSED150,
        UNUSED151,
        TRANSPARENTMediumVioletRed,
        TRANSPARENTTurquoise,
        TRANSPARENTLightVioletRed,
        TRANSPARENTRosyBrown,
        TRANSPARENTLawnGreen,
        UNUSED152,
        TRANSPARENTLightPink,
        UNUSED153,
        TRANSPARENTDarkGreen,
        TRANSPARENTPaleLimeGreen,
        UNUSED154,
        UNUSED155,
        TRANSPARENTMediumAquamarine,
        TRANSPARENTGreenYellow,
        UNUSED156,
        TRANSPARENTVioletRed,
        UNUSED157,
        UNUSED158,
        TRANSPARENTDarkMagenta,
        UNUSED159,
        TRANSPARENTDarkOliveDrab,
        TRANSPARENTDarkGoldenrod,
        UNUSED160,
        UNUSED161,
        TRANSPARENTSteelBlue,
        TRANSPARENTCornflowerBlue,
        TRANSPARENTDarkSalmon,
        TRANSPARENTOrchid,
        TRANSPARENTLimeGreen,
        UNUSED162,
        TRANSPARENTPaleAquamarine,
        UNUSED163,
        UNUSED164,
        TRANSPARENTPeru,
        UNUSED165,
        UNUSED166,
        TRANSPARENTThistle,
        TRANSPARENTMagenta,
        UNUSED167,
        TRANSPARENTPaleSpringGreen,
        TRANSPARENTNavyBlue,
        UNUSED168,
        TRANSPARENTLightSpringGreen,
        UNUSED169,
        UNUSED170,
    }
}
serde_try_from!(ChaoColor, u8);

try_from_enum! {
    #[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, EnumIter)]
    pub enum ChaoEggColor: u8 {
        Normal = 0,
        Yellow,
        White,
        Brown,
        SkyBlue,
        Pink,
        Blue,
        Grey,
        Green,
        Red,
        LimeGreen,
        Purple,
        Orange,
        Black,
        YellowTwoTone,
        WhiteTwoTone,
        BrownTwoTone,
        SkyBlueTwoTone,
        PinkTwoTone,
        BlueTwoTone,
        GreyTwoTone,
        GreenTwoTone,
        RedTwoTone,
        LimeGreenTwoTone,
        PurpleTwoTone,
        OrangeTwoTone,
        BlackTwoTone,
        NormalShiny,
        YellowShiny,
        WhiteShiny,
        BrownShiny,
        SkyBlueShiny,
        PinkShiny,
        BlueShiny,
        GreyShiny,
        GreenShiny,
        RedShiny,
        LimeGreenShiny,
        PurpleShiny,
        OrangeShiny,
        BlackShiny,
        YellowShinyTwoTone,
        WhiteShinyTwoTone,
        BrownShinyTwoTone,
        SkyBlueShinyTwoTone,
        PinkShinyTwoTone,
        BlueShinyTwoTone,
        GreyShinyTwoTone,
        GreenShinyTwoTone,
        RedShinyTwoTone,
        LimeGreenShinyTwoTone,
        PurpleShinyTwoTone,
        OrangeShinyTwoTone,
        BlackShinyTwoTone,
        Gold,
        Silver,
        Ruby,
        Sapphire,
        Emerald,
        Amethyst,
        Aquamarine,
        Garnet,
        Onyx,
        Peridot,
        Topaz,
        Pearl,
        Metal1,
        Metal2,
        Glass,
    }
}
serde_try_from!(ChaoEggColor, u8);

try_from_enum! {
    #[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, EnumIter)]
    pub enum ChaoTexture: u8 {
        None = 0,
        Gold,
        Silver,
        Ruby,
        Sapphire,
        Emerald,
        Amethyst,
        Aquamarine,
        Garnet,
        Onyx,
        Peridot,
        Topaz,
        Pearl,
        Metal1,
        Metal2,
        Glass,
        Moon,
        ShinyBlack,
        Pink,
        RedBottomWhiteTop,
        BlackMiddleWhiteOutside,
        ToothyGrin1,
        ToothyGrin2,
        WhiteLeftPinkRight,
        WhiteMiddleTurqoiseOutside,
        DevilChaosTailTopHornsFeet,
        DevilChaosHandsBottomHorns,
        DevilChaosChest,
        Yellow1,
        BlackLeftPurpleRight,
        DarkFlyChaoTexture,
        DarkFlyWings,
        BlackBottomtoWhiteTop,
        DarkRunBlueChestCurve,
        WhiteLefttoPurpleRight,
        BrownBottomtoWhiteTop,
        DarkandLightBrownHorizontalStripes,
        WhiteLefttoPinkMiddletoBlackRight1,
        DarkBluewithWhiteBlueCurve,
        YellowMiddleBlueOutside,
        WhiteLefttoPinkMiddletoBlackRight2,
        TurqoiseBottomBlackTop,
        BlackBottomBlueTop,
        WhiteLeftMidBlackOutsideRight,
        NormalEgg,
        BlackMiddleClearOutside,
        WhiteMiddleBlackOutside,
        TransparentPinkBottomtoWhiteTop,
        PeachMiddleWhiteOutside,
        WhitePinkSpots,
        KnucklesChaoChest,
        YellowBottomtoRedTop,
        GlossyRedBottomtoYellowTop,
        LeafTextureClearOutside,
        WoodenLog,
        BlackMiddleClearOutside1,
        Stone,
        GreyVerticalStripes,
        GreyHorizontalStripes,
        GreyCurvedStripesClearBottomRight,
        MetalicBrownBottomLightBrownTop,
        WoodenPlank1,
        LightRust,
        DarkRust,
        Beige,
        Yellow2,
        WoodenLogGrain,
        Watermelon,
        WatermelonSlice,
        RedWoolHat,
        BlackMiddleYellowtoClearOutside,
        Red,
        BlueWoolHat,
        BlackMiddleWhitetoClearOutside,
        Blue,
        BlackWoolHat,
        BlackMiddleGreytoClearOutside,
        DarkGrey,
        PinkMiddleYellowOutside,
        NeutralChaos1,
        NeutralChaos2,
        NeutralChaos3,
        AngelChaos1,
        AngelChaos2,
        LightGreen,
        WhiteBottomtoYellowTop,
        YellowMiddletoWhiteOutside,
        WhiteLightBlue,
        YellowLefttoWhiteRight,
        WhiteandBlueHorizontalStripes,
        WhiteandPinkHorizontalStripesBlueTop,
        WhiteLefttoPinkRight,
        HotPinkMiddletoOrangeOutside,
        WhiteLefttoOrangeRight,
        NeutralPowerSpikes,
        NeutralPowerHands,
        LightBlueMiddleWhiteOutside,
        YellowMiddleWhiteOutside,
        YellowBottomtoWhiteTop,
        WhiteBottomtoPinkTop,
        CyanLeftWhiteRight,
        WhiteBottomGreenTop1,
        WhiteBottomGreenTop2,
        LightBlueBottomGreenTop,
        WhiteandYellowHorizontalStripes,
        BrownBottomYellowTopwithStuds,
        DarkandLightBlueHorizontalStripes,
        WhiteBottomBlueTopwithStuds,
        BurntandRustOrange,
        BluewithYellowGrillsClearOutside,
        YellowHypnoticRings,
        WoodenPlank2,
        BlackMiddleClearOutside2,
        BlackZigZagClearOutside,
        BlackMiddleClearOutside3,
        White,
        GreyThinBlackVerticalStripes,
        WhiteBottomOrangeTop,
        WhiteMiddleOrangeOutside,
        WhiteBottomYellowTop,
        PurpleMiddleBlackOutside,
        Grey,
        PinkCheckerboard,
        ChaoFaceImageRedOutside,
        Skeleton,
        GreenCheckerboard,
    }
}
serde_try_from!(ChaoTexture, u8);

try_from_enum! {
    #[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, EnumIter)]
    pub enum ChaoHat: u8 {
        None = 0,
        Pumpkin,
        Skull,
        Apple,
        Bucket,
        EmptyCan,
        CardboardBox,
        FlowerPot,
        PaperBag,
        Pan,
        Stump,
        Watermelon,
        RedWoolBeanie,
        BlueWoolBeanie,
        BlackWoolBeanie,
        Pacifier,
        NormalEggShell,
        YellowEggShell,
        WhiteEggShell,
        BrownEggShell,
        SkyBlueEggShell,
        PinkEggShell,
        BlueEggShell,
        GreyEggShell,
        GreenEggShell,
        RedEggShell,
        LimeGreenEggShell,
        PurpleEggShell,
        OrangeEggShell,
        BlackEggShell,
        YellowTwoToneEggShell,
        WhiteTwoToneEggShell,
        BrownTwoToneEggShell,
        SkyBlueTwoToneEggShell,
        PinkTwoToneEggShell,
        BlueTwoToneEggShell,
        GreyTwoToneEggShell,
        GreenTwoToneEggShell,
        RedTwoToneEggShell,
        LimeGreenTwoToneEggShell,
        PurpleTwoToneEggShell,
        OrangeTwoToneEggShell,
        BlackTwoToneEggShell,
        NormalShinyEggShell,
        YellowShinyEggShell,
        WhiteShinyEggShell,
        BrownShinyEggShell,
        SkyBlueShinyEggShell,
        PinkShinyEggShell,
        BlueShinyEggShell,
        GreyShinyEggShell,
        GreenShinyEggShell,
        RedShinyEggShell,
        LimeGreenShinyEggShell,
        PurpleShinyEggShell,
        OrangeShinyEggShell,
        BlackShinyEggShell,
        YellowShinyTwoToneEggShell,
        WhiteShinyTwoToneEggShell,
        BrownShinyTwoToneEggShell,
        SkyBlueShinyTwoToneEggShell,
        PinkShinyTwoToneEggShell,
        BlueShinyTwoToneEggShell,
        GreyShinyTwoToneEggShell,
        GreenShinyTwoToneEggShell,
        RedShinyTwoToneEggShell,
        LimeGreenShinyTwoToneEggShell,
        PurpleShinyTwoToneEggShell,
        OrangeShinyTwoToneEggShell,
        BlackShinyTwoToneEggShell,
        GoldEggShell,
        SilverEggShell,
        RubyEggShell,
        SapphireEggShell,
        EmeraldEggShell,
        AmethystEggShell,
        AquamarineEggShell,
        GarnetEggShell,
        OnyxEggShell,
        PeridotEggShell,
        TopazEggShell,
        PearlEggShell,
        Metal1EggShell,
        Metal2EggShell,
        GlassEggShell,
    }
}
serde_try_from!(ChaoHat, u8);

try_from_enum! {
    #[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, EnumIter)]
    pub enum ChaoGarden: u8 {
        None = 0,
        NeutralGarden,
        HeroGarden,
        DarkGarden,
        StationSquare,
        EggCarrier,
        MysticRuins,
    }
}
serde_try_from!(ChaoGarden, u8);

try_from_enum! {
    #[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, EnumIter)]
    pub enum ChaoType: u8 {
        Empty = 0,
        Egg,
        Child,
        UNUSEDGood,
        UNUSEDBad,
        NormalNeutral,
        NormalHero,
        NormalDark,
        SwimNeutral,
        SwimHero,
        SwimDark,
        FlyNeutral,
        FlyHero,
        FlyDark,
        RunNeutral,
        RunHero,
        RunDark,
        PowerNeutral,
        PowerHero,
        PowerDark,
        ChaosNeutral,
        ChaosHero,
        ChaosDark,
        Tails,
        Knuckles,
        Amy,
    }
}
serde_try_from!(ChaoType, u8);

try_from_enum! {
    #[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, EnumIter)]
    pub enum ChaoEyes: u8 {
        Normal = 0,
        Painful,
        ClosedStraight,
        ClosedHappy,
        ClosedUp,
        Tiny,
        Circles,
        ClosedDown,
        Tiny2,
        HalfClosed,
        Mean,
        GreenChaos,
        BlueChaos,
        YellowChaos,
    }
}
serde_try_from!(ChaoEyes, u8);

try_from_enum! {
    #[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, EnumIter)]
    pub enum ChaoMouth: u8 {
        None = 0,
        ToothySmile,
        Open,
        ClosedSmile,
        ClosedFrown,
        OpenSmile,
        OpenFrown,
        CloseSmile2,
        Squiggly,
        ToothyFrown,
        ClosedFrown2,
        WideOpen,
        ClosedFrown3,
        StraightMustache,
        StraightMustache2,
        StraightMustache3,
    }
}
serde_try_from!(ChaoMouth, u8);

try_from_enum! {
    #[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, EnumIter)]
    pub enum ChaoEmotiball: u8 {
        Normal = 0,
        Flame,
        None,
    }
}
serde_try_from!(ChaoEmotiball, u8);

try_from_enum! {
    #[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, EnumIter)]
    pub enum ChaoBodyType: u8 {
        Normal = 0,
        Egg,
        Omochao,
        Animal,
        UNUSED,
        None,
    }
}
serde_try_from!(ChaoBodyType, u8);

try_from_enum! {
    #[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, EnumIter)]
    pub enum ChaoMedal: u8 {
        None = 0,
        Aquamarine,
        Topaz,
        Peridot,
        Garnet,
        Onyx,
        Diamond,
        Beginner,
        Challenge,
        Hero,
        Dark,
        Pearl,
        Amethyst,
        Emerald,
        Ruby,
        Sapphire,
    }
}
serde_try_from!(ChaoMedal, u8);

try_from_enum! {
    #[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, EnumIter)]
    pub enum ChaoAnimal: u8 {
        Penguin = 0,
        Seal = 1,
        Otter = 2,
        Rabbit = 3,
        Cheetah = 4,
        Warthog = 5,
        Bear = 6,
        Tiger = 7,
        Gorilla = 8,
        Peacock = 9,
        Parrot = 10,
        Condor = 11,
        Skunk = 12,
        Sheep = 13,
        Raccoon = 14,
        HalfFish = 15,
        SkeletonDog = 16,
        Bat = 17,
        Dragon = 18,
        Unicorn = 19,
        Phoenix = 20,
        None = 255,
    }
}
serde_try_from!(ChaoAnimal, u8);

try_from_enum! {
    #[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, EnumIter, TS)]
    #[ts(export, export_to = "../src/gen/model/types/ChaoAnimalPartHorns.ts")]
    pub enum ChaoAnimalPartHorns: u8 {
        Invalid = 0,
        Sheep = 13,
        Dragon = 18,
        None = 255,
    }
}
serde_try_from!(ChaoAnimalPartHorns, u8);

try_from_enum! {
    #[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, EnumIter)]
    pub enum ChaoAnimalPartForehead: u8 {
        Penguin = 0,
        Gorilla = 8,
        Peacock = 9,
        Parrot = 10,
        Skunk = 12,
        Unicorn = 19,
        Phoenix = 20,
        None = 255,
    }
}
serde_try_from!(ChaoAnimalPartForehead, u8);

try_from_enum! {
    #[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, EnumIter)]
    pub enum ChaoAnimalPartEars: u8 {
        Invalid = 0,
        Otter = 2,
        Rabbit = 3,
        Cheetah = 4,
        Warthog = 5,
        Bear = 6,
        Tiger = 7,
        Gorilla = 8,
        Condor = 11,
        Sheep = 13,
        Raccoon = 14,
        Dragon = 18,
        Unicorn = 19,
        None = 255,
    }
}
serde_try_from!(ChaoAnimalPartEars, u8);

try_from_enum! {
    #[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, EnumIter)]
    pub enum ChaoAnimalPartArms: u8 {
        Penguin = 0,
        Seal = 1,
        Otter = 2,
        Rabbit = 3,
        Cheetah = 4,
        Warthog = 5,
        Bear = 6,
        Tiger = 7,
        Gorilla = 8,
        Skunk = 12,
        Sheep = 13,
        Raccoon = 14,
        Dragon = 18,
        Unicorn = 19,
        None = 255,
    }
}
serde_try_from!(ChaoAnimalPartArms, u8);

try_from_enum! {
    #[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, EnumIter)]
    pub enum ChaoAnimalPartFace: u8 {
        Invalid = 0,
        Otter = 2,
        Warthog = 5,
        None = 255,
    }
}
serde_try_from!(ChaoAnimalPartFace, u8);

try_from_enum! {
    #[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, EnumIter)]
    pub enum ChaoAnimalPartBody: u8 {
        Penguin = 0,
        Seal = 1,
        Otter = 2,
        Rabbit = 3,
        Cheetah = 4,
        Warthog = 5,
        Bear = 6,
        Tiger = 7,
        Gorilla = 8,
        Peacock = 9,
        Parrot = 10,
        Condor = 11,
        Skunk = 12,
        Sheep = 13,
        Raccoon = 14,
        HalfFish = 15,
        SkeletonDog = 16,
        Bat = 17,
        Dragon = 18,
        Unicorn = 19,
        Phoenix = 20,
        None = 255,
    }
}
serde_try_from!(ChaoAnimalPartBody, u8);

try_from_enum! {
    #[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, EnumIter)]
    pub enum ChaoAnimalPartWings: u8 {
        Invalid = 0,
        Peacock = 9,
        Parrot = 10,
        Condor = 11,
        Dragon = 18,
        Phoenix = 20,
        None = 255,
    }
}
serde_try_from!(ChaoAnimalPartWings, u8);

try_from_enum! {
    #[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, EnumIter)]
    pub enum ChaoAnimalPartTail: u8 {
        Invalid = 0,
        Seal = 1,
        Otter = 2,
        Rabbit = 3,
        Cheetah = 4,
        Warthog = 5,
        Tiger = 7,
        Peacock = 9,
        Parrot = 10,
        Condor = 11,
        Skunk = 12,
        Sheep = 13,
        Dragon = 18,
        Unicorn = 19,
        Phoenix = 20,
        None = 255,
    }
}
serde_try_from!(ChaoAnimalPartTail, u8);

try_from_enum! {
    #[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, EnumIter)]
    pub enum ChaoAnimalPartLegs: u8 {
        Penguin = 0,
        Otter = 2,
        Rabbit = 3,
        Cheetah = 4,
        Warthog = 5,
        Bear = 6,
        Tiger = 7,
        Gorilla = 8,
        Peacock = 9,
        Parrot = 10,
        Condor = 11,
        Skunk = 12,
        Sheep = 13,
        Raccoon = 14,
        Dragon = 18,
        Unicorn = 19,
        Phoenix = 20,
        None = 255,
    }
}
serde_try_from!(ChaoAnimalPartLegs, u8);

try_from_enum! {
    #[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, EnumIter)]
    pub enum ChaoFruit: u8 {
        ChaoGardenFruit = 0,
        HeroGardenFruit,
        DarkGardenFruit,
        StrongFruit,
        TastyFruit,
        HeroFruit,
        DarkFruit,
        RoundFruit,
        TriangleFruit,
        SquareFruit,
        HeartFruit,
        ChaoFruit,
        SmartFruit,
        OrangeFruit,
        BlueFruit,
        PinkFruit,
        GreenFruit,
        PurpleFruit,
        YellowFruit,
        RedFruit,
        Mushroom,
        MushroomX2,
        MintCandy,
        Grapes,
        CweHyperSwimFruit = 29,
        CweHyperFlyFruit = 30,
        CweHyperRunFruit = 31,
        CweHyperPowerFruit = 32,
        CweShinyFruit = 33,
    }
}
serde_try_from!(ChaoFruit, u8);

try_from_enum! {
    #[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, EnumIter)]
    pub enum ChaoFavoriteFruit: u8 {
        RoundFruit1 = 0,
        RoundFruit2,
        TriangleFruit1,
        TriangleFruit2,
        SquareFruit1,
        SquareFruit2,
        None1,
        None2,
        NoneChaos = 16,
    }
}
serde_try_from!(ChaoFavoriteFruit, u8);

try_from_enum! {
    #[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, EnumIter)]
    pub enum ChaoFruitSeed: u8 {
        Strong = 0,
        Tasty,
        Hero,
        Dark,
        Round,
        Triangle,
        Square,
    }
}
serde_try_from!(ChaoFruitSeed, u8);


bitflags! {
    #[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
    pub struct ChaoToys: u32 {
        const Rattle = 1 << 0;
        const Car = 1 << 1;
        const PictureBook = 1 << 2;
        const UNKNOWN = 1 << 3;
        const SonicDoll = 1 << 4;
        const Broomstick = 1 << 5;
        const Glitch = 1 << 6;
        const PogoStick = 1 << 7;
        const Crayons = 1 << 8;
        const BubbleWand = 1 << 9;
        const Shovel = 1 << 10;
        const WateringCan = 1 << 11;
    }
}
try_from_bitflags!(ChaoToys, u32);
serde_try_from!(ChaoToys, u32);

bitflags! {
    #[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
    pub struct ChaoClassroomSkills: u32 {
        const Drawing1 = 1 << 0;
        const Drawing2 = 1 << 1;
        const Drawing3 = 1 << 2;
        const Drawing4 = 1 << 3;
        const Drawing5 = 1 << 4;
        const Unknown1 = 1 << 5;
        const Unknown2 = 1 << 6;
        const Unknown3 = 1 << 7;
        const Shake = 1 << 8;
        const Spin = 1 << 9;
        const Step = 1 << 10;
        const GoGo = 1 << 11;
        const Exercise = 1 << 12;
        const Unknown4 = 1 << 13;
        const Unknown5 = 1 << 14;
        const Unknown6 = 1 << 15;
        const Song1 = 1 << 16;
        const Song2 = 1 << 17;
        const Song3 = 1 << 18;
        const Song4 = 1 << 19;
        const Song5 = 1 << 20;
        const Unknown7 = 1 << 21;
        const Unknown8 = 1 << 22;
        const Unknown9 = 1 << 23;
        const Bell = 1 << 24;
        const Castanets = 1 << 25;
        const Cymbals = 1 << 26;
        const Drum = 1 << 27;
        const Flute = 1 << 28;
        const Maracas = 1 << 29;
        const Trumpet = 1 << 30;
        const Tambourine = 1 << 31;
    }
}
try_from_bitflags!(ChaoClassroomSkills, u32);
serde_try_from!(ChaoClassroomSkills, u32);

bitflags! {
    #[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
    pub struct ChaoSaAnimalBehaviors: u32 {
        const Seal = 1 << 0;
        const Penguin = 1 << 1;
        const Otter = 1 << 2;
        const Peacock = 1 << 3;
        const Swallow = 1 << 4;
        const Parrot = 1 << 5;
        const Deer = 1 << 6;
        const Rabbit = 1 << 7;
        const Kangaroo = 1 << 8;
        const Gorilla = 1 << 9;
        const Lion = 1 << 10;
        const Elephant = 1 << 11;
        const Mole = 1 << 12;
        const Koala = 1 << 13;
        const Skunk = 1 << 14;
    }
}
try_from_bitflags!(ChaoSaAnimalBehaviors, u32);
serde_try_from!(ChaoSaAnimalBehaviors, u32);

bitflags! {
    #[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
    pub struct ChaoSa2AnimalBehaviors: u32 {
        const Penguin = 1 << 0;
        const Seal = 1 << 1;
        const Otter = 1 << 2;
        const Rabbit = 1 << 3;
        const Cheetah = 1 << 4;
        const Warthog = 1 << 5;
        const Bear = 1 << 6;
        const Tiger = 1 << 7;
        const Gorilla = 1 << 8;
        const Peacock = 1 << 9;
        const Parrot = 1 << 10;
        const Condor = 1 << 11;
        const Skunk = 1 << 12;
        const Sheep = 1 << 13;
        const Raccoon = 1 << 14;
        const HalfFish = 1 << 15;
        const SkeletonDog = 1 << 16;
        const Bat = 1 << 17;
        const Dragon = 1 << 18;
        const Unicorn = 1 << 19;
        const Phoenix = 1 << 20;
    }
}
try_from_bitflags!(ChaoSa2AnimalBehaviors, u32);
serde_try_from!(ChaoSa2AnimalBehaviors, u32);

pub fn chao_char_to_byte(c: char) -> Option<u8> {
    Some(match c {
        '!' => 0x01, '\"' => 0x02, '#' => 0x03, '$' => 0x04, '%' => 0x05, '&' => 0x06, '\\' => 0x07, '(' => 0x08,
        ')' => 0x09, '*' => 0x0A, '+' => 0x0B, ',' => 0x0C, '-' => 0x0D, '.' => 0x0E, '/' => 0x0F, '0' => 0x10,
        '1' => 0x11, '2' => 0x12, '3' => 0x13, '4' => 0x14, '5' => 0x15, '6' => 0x16, '7' => 0x17, '8' => 0x18,
        '9' => 0x19, ':' => 0x1A, ';' => 0x1B, '<' => 0x1C, '=' => 0x1D, '>' => 0x1E, '?' => 0x1F, '@' => 0x20,
        'A' => 0x21, 'B' => 0x22, 'C' => 0x23, 'D' => 0x24, 'E' => 0x25, 'F' => 0x26, 'G' => 0x27, 'H' => 0x28,
        'I' => 0x29, 'J' => 0x2A, 'K' => 0x2B, 'L' => 0x2C, 'M' => 0x2D, 'N' => 0x2E, 'O' => 0x2F, 'P' => 0x30,
        'Q' => 0x31, 'R' => 0x32, 'S' => 0x33, 'T' => 0x34, 'U' => 0x35, 'V' => 0x36, 'W' => 0x37, 'X' => 0x38,
        'Y' => 0x39, 'Z' => 0x3A, '[' => 0x3B, '¥' => 0x3C, ']' => 0x3D, '^' => 0x3E, '_' => 0x3F, '‘' => 0x40,
        'a' => 0x41, 'b' => 0x42, 'c' => 0x43, 'd' => 0x44, 'e' => 0x45, 'f' => 0x46, 'g' => 0x47, 'h' => 0x48,
        'i' => 0x49, 'j' => 0x4A, 'k' => 0x4B, 'l' => 0x4C, 'm' => 0x4D, 'n' => 0x4E, 'o' => 0x4F, 'p' => 0x50,
        'q' => 0x51, 'r' => 0x52, 's' => 0x53, 't' => 0x54, 'u' => 0x55, 'v' => 0x56, 'w' => 0x57, 'x' => 0x58,
        'y' => 0x59, 'z' => 0x5A, '{' => 0x5B, '|' => 0x5C, '}' => 0x5D, '~' => 0x5E, ' ' => 0x5F, 'À' => 0x60,
        'Á' => 0x61, 'Â' => 0x62, 'Ã' => 0x63, 'Ä' => 0x64, 'Å' => 0x65, 'Æ' => 0x66, 'Ç' => 0x67, 'È' => 0x68,
        'É' => 0x69, 'Ê' => 0x6A, 'Ë' => 0x6B, 'Ì' => 0x6C, 'Í' => 0x6D, 'Î' => 0x6E, 'Ï' => 0x6F, 'Ð' => 0x70,
        'Ñ' => 0x71, 'Ò' => 0x72, 'Ó' => 0x73, 'Ô' => 0x74, 'Õ' => 0x75, 'Ö' => 0x76, '¿' => 0x77, 'Ø' => 0x78,
        'Ù' => 0x79, 'Ú' => 0x7A, 'Û' => 0x7B, 'Ü' => 0x7C, 'Ý' => 0x7D, 'Þ' => 0x7E, 'ß' => 0x7F, 'à' => 0x80,
        'á' => 0x81, 'â' => 0x82, 'ã' => 0x83, 'ä' => 0x84, 'å' => 0x85, 'æ' => 0x86, 'ç' => 0x87, 'è' => 0x88,
        'é' => 0x89, 'ê' => 0x8A, 'ë' => 0x8B, 'ì' => 0x8C, 'í' => 0x8D, 'î' => 0x8E, 'ï' => 0x8F, 'ð' => 0x90,
        'ñ' => 0x91, 'ò' => 0x92, 'ó' => 0x93, 'ô' => 0x94, 'õ' => 0x95, 'ö' => 0x96, '¡' => 0x97, 'ø' => 0x98,
        'ù' => 0x99, 'ú' => 0x9A, 'û' => 0x9B, 'ü' => 0x9C, 'ý' => 0x9D, 'þ' => 0x9E, 'ÿ' => 0x9F, 'ァ' => 0xA0,
        'ア' => 0xA1, 'ィ' => 0xA2, 'イ' => 0xA3, 'ゥ' => 0xA4, 'ウ' => 0xA5, 'ェ' => 0xA6, 'エ' => 0xA7, 'ォ' => 0xA8,
        'オ' => 0xA9, 'カ' => 0xAA, 'ガ' => 0xAB, 'キ' => 0xAC, 'ギ' => 0xAD, 'ク' => 0xAE, 'グ' => 0xAF, 'ケ' => 0xB0,
        'ゲ' => 0xB1, 'コ' => 0xB2, 'ゴ' => 0xB3, 'サ' => 0xB4, 'ザ' => 0xB5, 'シ' => 0xB6, 'ジ' => 0xB7, 'ス' => 0xB8,
        'ズ' => 0xB9, 'セ' => 0xBA, 'ゼ' => 0xBB, 'ソ' => 0xBC, 'ゾ' => 0xBD, 'タ' => 0xBE, 'ダ' => 0xBF, 'チ' => 0xC0,
        'ヂ' => 0xC1, 'ツ' => 0xC2, 'ッ' => 0xC3, 'ヅ' => 0xC4, 'テ' => 0xC5, 'デ' => 0xC6, 'ト' => 0xC7, 'ド' => 0xC8,
        'ナ' => 0xC9, 'ニ' => 0xCA, 'ヌ' => 0xCB, 'ネ' => 0xCC, 'ノ' => 0xCD, 'ハ' => 0xCE, 'バ' => 0xCF, 'パ' => 0xD0,
        'ヒ' => 0xD1, 'ビ' => 0xD2, 'ピ' => 0xD3, 'フ' => 0xD4, 'ブ' => 0xD5, 'プ' => 0xD6, 'ヘ' => 0xD7, 'ベ' => 0xD8,
        'ペ' => 0xD9, 'ホ' => 0xDA, 'ボ' => 0xDB, 'ポ' => 0xDC, 'マ' => 0xDD, 'ミ' => 0xDE, 'ム' => 0xDF, 'メ' => 0xE0,
        'モ' => 0xE1, 'ャ' => 0xE2, 'ヤ' => 0xE3, 'ュ' => 0xE4, 'ユ' => 0xE5, 'ョ' => 0xE6, 'ヨ' => 0xE7, 'ラ' => 0xE8,
        'リ' => 0xE9, 'ル' => 0xEA, 'レ' => 0xEB, 'ロ' => 0xEC, 'ヮ' => 0xED, 'ワ' => 0xEE, 'ﾞ' => 0xEF, 'ﾟ' => 0xF0,
        'ヲ' => 0xF1, 'ン' => 0xF2, '。' => 0xF3, '、' => 0xF4, '〒' => 0xF5, '・' => 0xF6, '★' => 0xF7, '♀' => 0xF8,
        '♂' => 0xF9, '♪' => 0xFA, '…' => 0xFB, '「' => 0xFC, '」' => 0xFD, 'ヴ' => 0xFE,
        _ => { return None; },
    })
}

pub fn chao_byte_to_char(b: u8) -> Option<char> {
    Some(match b {
        0x01 => '!', 0x02 => '\"', 0x03 => '#', 0x04 => '$', 0x05 => '%', 0x06 => '&', 0x07 => '\\', 0x08 => '(',
        0x09 => ')', 0x0A => '*', 0x0B => '+', 0x0C => ',', 0x0D => '-', 0x0E => '.', 0x0F => '/', 0x10 => '0',
        0x11 => '1', 0x12 => '2', 0x13 => '3', 0x14 => '4', 0x15 => '5', 0x16 => '6', 0x17 => '7', 0x18 => '8',
        0x19 => '9', 0x1A => ':', 0x1B => ';', 0x1C => '<', 0x1D => '=', 0x1E => '>', 0x1F => '?', 0x20 => '@',
        0x21 => 'A', 0x22 => 'B', 0x23 => 'C', 0x24 => 'D', 0x25 => 'E', 0x26 => 'F', 0x27 => 'G', 0x28 => 'H',
        0x29 => 'I', 0x2A => 'J', 0x2B => 'K', 0x2C => 'L', 0x2D => 'M', 0x2E => 'N', 0x2F => 'O', 0x30 => 'P',
        0x31 => 'Q', 0x32 => 'R', 0x33 => 'S', 0x34 => 'T', 0x35 => 'U', 0x36 => 'V', 0x37 => 'W', 0x38 => 'X',
        0x39 => 'Y', 0x3A => 'Z', 0x3B => '[', 0x3C => '¥', 0x3D => ']', 0x3E => '^', 0x3F => '_', 0x40 => '‘',
        0x41 => 'a', 0x42 => 'b', 0x43 => 'c', 0x44 => 'd', 0x45 => 'e', 0x46 => 'f', 0x47 => 'g', 0x48 => 'h',
        0x49 => 'i', 0x4A => 'j', 0x4B => 'k', 0x4C => 'l', 0x4D => 'm', 0x4E => 'n', 0x4F => 'o', 0x50 => 'p',
        0x51 => 'q', 0x52 => 'r', 0x53 => 's', 0x54 => 't', 0x55 => 'u', 0x56 => 'v', 0x57 => 'w', 0x58 => 'x',
        0x59 => 'y', 0x5A => 'z', 0x5B => '{', 0x5C => '|', 0x5D => '}', 0x5E => '~', 0x5F => ' ', 0x60 => 'À',
        0x61 => 'Á', 0x62 => 'Â', 0x63 => 'Ã', 0x64 => 'Ä', 0x65 => 'Å', 0x66 => 'Æ', 0x67 => 'Ç', 0x68 => 'È',
        0x69 => 'É', 0x6A => 'Ê', 0x6B => 'Ë', 0x6C => 'Ì', 0x6D => 'Í', 0x6E => 'Î', 0x6F => 'Ï', 0x70 => 'Ð',
        0x71 => 'Ñ', 0x72 => 'Ò', 0x73 => 'Ó', 0x74 => 'Ô', 0x75 => 'Õ', 0x76 => 'Ö', 0x77 => '¿', 0x78 => 'Ø',
        0x79 => 'Ù', 0x7A => 'Ú', 0x7B => 'Û', 0x7C => 'Ü', 0x7D => 'Ý', 0x7E => 'Þ', 0x7F => 'ß', 0x80 => 'à',
        0x81 => 'á', 0x82 => 'â', 0x83 => 'ã', 0x84 => 'ä', 0x85 => 'å', 0x86 => 'æ', 0x87 => 'ç', 0x88 => 'è',
        0x89 => 'é', 0x8A => 'ê', 0x8B => 'ë', 0x8C => 'ì', 0x8D => 'í', 0x8E => 'î', 0x8F => 'ï', 0x90 => 'ð',
        0x91 => 'ñ', 0x92 => 'ò', 0x93 => 'ó', 0x94 => 'ô', 0x95 => 'õ', 0x96 => 'ö', 0x97 => '¡', 0x98 => 'ø',
        0x99 => 'ù', 0x9A => 'ú', 0x9B => 'û', 0x9C => 'ü', 0x9D => 'ý', 0x9E => 'þ', 0x9F => 'ÿ', 0xA0 => 'ァ',
        0xA1 => 'ア', 0xA2 => 'ィ', 0xA3 => 'イ', 0xA4 => 'ゥ', 0xA5 => 'ウ', 0xA6 => 'ェ', 0xA7 => 'エ', 0xA8 => 'ォ',
        0xA9 => 'オ', 0xAA => 'カ', 0xAB => 'ガ', 0xAC => 'キ', 0xAD => 'ギ', 0xAE => 'ク', 0xAF => 'グ', 0xB0 => 'ケ',
        0xB1 => 'ゲ', 0xB2 => 'コ', 0xB3 => 'ゴ', 0xB4 => 'サ', 0xB5 => 'ザ', 0xB6 => 'シ', 0xB7 => 'ジ', 0xB8 => 'ス',
        0xB9 => 'ズ', 0xBA => 'セ', 0xBB => 'ゼ', 0xBC => 'ソ', 0xBD => 'ゾ', 0xBE => 'タ', 0xBF => 'ダ', 0xC0 => 'チ',
        0xC1 => 'ヂ', 0xC2 => 'ツ', 0xC3 => 'ッ', 0xC4 => 'ヅ', 0xC5 => 'テ', 0xC6 => 'デ', 0xC7 => 'ト', 0xC8 => 'ド',
        0xC9 => 'ナ', 0xCA => 'ニ', 0xCB => 'ヌ', 0xCC => 'ネ', 0xCD => 'ノ', 0xCE => 'ハ', 0xCF => 'バ', 0xD0 => 'パ',
        0xD1 => 'ヒ', 0xD2 => 'ビ', 0xD3 => 'ピ', 0xD4 => 'フ', 0xD5 => 'ブ', 0xD6 => 'プ', 0xD7 => 'ヘ', 0xD8 => 'ベ',
        0xD9 => 'ペ', 0xDA => 'ホ', 0xDB => 'ボ', 0xDC => 'ポ', 0xDD => 'マ', 0xDE => 'ミ', 0xDF => 'ム', 0xE0 => 'メ',
        0xE1 => 'モ', 0xE2 => 'ャ', 0xE3 => 'ヤ', 0xE4 => 'ュ', 0xE5 => 'ユ', 0xE6 => 'ョ', 0xE7 => 'ヨ', 0xE8 => 'ラ',
        0xE9 => 'リ', 0xEA => 'ル', 0xEB => 'レ', 0xEC => 'ロ', 0xED => 'ヮ', 0xEE => 'ワ', 0xEF => 'ﾞ', 0xF0 => 'ﾟ',
        0xF1 => 'ヲ', 0xF2 => 'ン', 0xF3 => '。', 0xF4 => '、', 0xF5 => '〒', 0xF6 => '・', 0xF7 => '★', 0xF8 => '♀',
        0xF9 => '♂', 0xFA => '♪', 0xFB => '…', 0xFC => '「', 0xFD => '」', 0xFE => 'ヴ',
        _ => { return None; },
    })
}

lazy_static! {
    pub static ref CHAO_STRING_MAPPINGS: BiMap::<char, u8> = {
        BiMap::<char, u8>::from_iter(vec![
            ('!', 0x01), ('\"', 0x02), ('#', 0x03), ('$', 0x04), ('%', 0x05), ('&', 0x06), ('\\', 0x07), ('(', 0x08),
            (')', 0x09), ('*', 0x0A), ('+', 0x0B), (',', 0x0C), ('-', 0x0D), ('.', 0x0E), ('/', 0x0F), ('0', 0x10),
            ('1', 0x11), ('2', 0x12), ('3', 0x13), ('4', 0x14), ('5', 0x15), ('6', 0x16), ('7', 0x17), ('8', 0x18),
            ('9', 0x19), (':', 0x1A), (';', 0x1B), ('<', 0x1C), ('=', 0x1D), ('>', 0x1E), ('?', 0x1F), ('@', 0x20),
            ('A', 0x21), ('B', 0x22), ('C', 0x23), ('D', 0x24), ('E', 0x25), ('F', 0x26), ('G', 0x27), ('H', 0x28),
            ('I', 0x29), ('J', 0x2A), ('K', 0x2B), ('L', 0x2C), ('M', 0x2D), ('N', 0x2E), ('O', 0x2F), ('P', 0x30),
            ('Q', 0x31), ('R', 0x32), ('S', 0x33), ('T', 0x34), ('U', 0x35), ('V', 0x36), ('W', 0x37), ('X', 0x38),
            ('Y', 0x39), ('Z', 0x3A), ('[', 0x3B), ('¥', 0x3C), (']', 0x3D), ('^', 0x3E), ('_', 0x3F), ('‘', 0x40),
            ('a', 0x41), ('b', 0x42), ('c', 0x43), ('d', 0x44), ('e', 0x45), ('f', 0x46), ('g', 0x47), ('h', 0x48),
            ('i', 0x49), ('j', 0x4A), ('k', 0x4B), ('l', 0x4C), ('m', 0x4D), ('n', 0x4E), ('o', 0x4F), ('p', 0x50),
            ('q', 0x51), ('r', 0x52), ('s', 0x53), ('t', 0x54), ('u', 0x55), ('v', 0x56), ('w', 0x57), ('x', 0x58),
            ('y', 0x59), ('z', 0x5A), ('{', 0x5B), ('|', 0x5C), ('}', 0x5D), ('~', 0x5E), (' ', 0x5F), ('À', 0x60),
            ('Á', 0x61), ('Â', 0x62), ('Ã', 0x63), ('Ä', 0x64), ('Å', 0x65), ('Æ', 0x66), ('Ç', 0x67), ('È', 0x68),
            ('É', 0x69), ('Ê', 0x6A), ('Ë', 0x6B), ('Ì', 0x6C), ('Í', 0x6D), ('Î', 0x6E), ('Ï', 0x6F), ('Ð', 0x70),
            ('Ñ', 0x71), ('Ò', 0x72), ('Ó', 0x73), ('Ô', 0x74), ('Õ', 0x75), ('Ö', 0x76), ('¿', 0x77), ('Ø', 0x78),
            ('Ù', 0x79), ('Ú', 0x7A), ('Û', 0x7B), ('Ü', 0x7C), ('Ý', 0x7D), ('Þ', 0x7E), ('ß', 0x7F), ('à', 0x80),
            ('á', 0x81), ('â', 0x82), ('ã', 0x83), ('ä', 0x84), ('å', 0x85), ('æ', 0x86), ('ç', 0x87), ('è', 0x88),
            ('é', 0x89), ('ê', 0x8A), ('ë', 0x8B), ('ì', 0x8C), ('í', 0x8D), ('î', 0x8E), ('ï', 0x8F), ('ð', 0x90),
            ('ñ', 0x91), ('ò', 0x92), ('ó', 0x93), ('ô', 0x94), ('õ', 0x95), ('ö', 0x96), ('¡', 0x97), ('ø', 0x98),
            ('ù', 0x99), ('ú', 0x9A), ('û', 0x9B), ('ü', 0x9C), ('ý', 0x9D), ('þ', 0x9E), ('ÿ', 0x9F), ('ァ', 0xA0),
            ('ア', 0xA1), ('ィ', 0xA2), ('イ', 0xA3), ('ゥ', 0xA4), ('ウ', 0xA5), ('ェ', 0xA6), ('エ', 0xA7), ('ォ', 0xA8),
            ('オ', 0xA9), ('カ', 0xAA), ('ガ', 0xAB), ('キ', 0xAC), ('ギ', 0xAD), ('ク', 0xAE), ('グ', 0xAF), ('ケ', 0xB0),
            ('ゲ', 0xB1), ('コ', 0xB2), ('ゴ', 0xB3), ('サ', 0xB4), ('ザ', 0xB5), ('シ', 0xB6), ('ジ', 0xB7), ('ス', 0xB8),
            ('ズ', 0xB9), ('セ', 0xBA), ('ゼ', 0xBB), ('ソ', 0xBC), ('ゾ', 0xBD), ('タ', 0xBE), ('ダ', 0xBF), ('チ', 0xC0),
            ('ヂ', 0xC1), ('ツ', 0xC2), ('ッ', 0xC3), ('ヅ', 0xC4), ('テ', 0xC5), ('デ', 0xC6), ('ト', 0xC7), ('ド', 0xC8),
            ('ナ', 0xC9), ('ニ', 0xCA), ('ヌ', 0xCB), ('ネ', 0xCC), ('ノ', 0xCD), ('ハ', 0xCE), ('バ', 0xCF), ('パ', 0xD0),
            ('ヒ', 0xD1), ('ビ', 0xD2), ('ピ', 0xD3), ('フ', 0xD4), ('ブ', 0xD5), ('プ', 0xD6), ('ヘ', 0xD7), ('ベ', 0xD8),
            ('ペ', 0xD9), ('ホ', 0xDA), ('ボ', 0xDB), ('ポ', 0xDC), ('マ', 0xDD), ('ミ', 0xDE), ('ム', 0xDF), ('メ', 0xE0),
            ('モ', 0xE1), ('ャ', 0xE2), ('ヤ', 0xE3), ('ュ', 0xE4), ('ユ', 0xE5), ('ョ', 0xE6), ('ヨ', 0xE7), ('ラ', 0xE8),
            ('リ', 0xE9), ('ル', 0xEA), ('レ', 0xEB), ('ロ', 0xEC), ('ヮ', 0xED), ('ワ', 0xEE), ('ﾞ', 0xEF), ('ﾟ', 0xF0),
            ('ヲ', 0xF1), ('ン', 0xF2), ('。', 0xF3), ('、', 0xF4), ('〒', 0xF5), ('・', 0xF6), ('★', 0xF7), ('♀', 0xF8),
            ('♂', 0xF9), ('♪', 0xFA), ('…', 0xFB), ('「', 0xFC), ('」', 0xFD), ('ヴ', 0xFE),
        ])
    };
}
