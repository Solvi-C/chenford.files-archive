/***********************
 * 1) YOUR DATA HERE
 ***********************/
const SCENE_PACKS = [
  {
      id: "S801B",
      title: "Baja UC",
      season: "8",
      tags: ["lucy chen", "nyla harper", "chenford", "jyla", "action", "angst", "undercover op", "story arc"],
      dateAdded: "02-23-2026",
      size: "557.9MB",
      download: "https://mega.nz/file/NlwVlQ6C#1yFD9igdutZG4Dth6RmtCygTAR4cSpWc2RbQj0R289U",
      preview: "scenepack photos/bajauc.jpg",
      notes: "includes before, during, and after the op",
    },
  
  {
      id: "S801A",
      title: "Chenford Season 8",
      season: "8",
      tags: ["chenford", "lucy chen", "tim bradfod", "compilation", "romance", "still updating"],
      dateAdded: "02-23-2026",
      size: "623.2MB",
      download: "https://mega.nz/file/N9QG3ZbJ#KJy07Ja67dPuxxciZATY6z8JBL4Re2FZQjyu1Ce3ul4",
      preview: "scenepack photos/chenfords8.JPEG",
      notes: "up to episode 7 (Baja)",
    },
  
  {
    id: "S501B",
    title: "Angela Lopez Season 5 Scenes",
    season: "5",
    tags: ["angela lopez", "supporting characters", "action", "compilation"],
    dateAdded: "06-29-2025",
    size: "11.72GB",
    download: "https://mega.nz/folder/ogBglZIC#55U2M72CL-e_1sdmRgNYrA",
    preview: "scenepack photos/lopezs5.png",
    notes: "",
  },

  {
    id: "S718E",
    title: "Mile's Date",
    season: "7",
    tags: ["miles penn", "supporting characters", "action",],
    dateAdded: "05-23-2025",
    size: "923.2MB",
    download: "https://mega.nz/file/985FWBKA#uBsrlnL4xKTwLHo5_ZuV9u83ZtPnX6UvV2fYjsObQ2k",
    preview: "scenepack photos/milesdate.png",
    notes: "",
  },

  {
    id: "S718D",
    title: "Monica's Return",
    season: "7",
    tags: ["supporting characters", "action"],
    dateAdded: "05-23-2025",
    size: "188.9MB",
    download: "https://mega.nz/file/QsJnxIDZ#P5OK10YvahK8mNYUFc3Fn9m0-KK8qaT_naRNFGlbWkY",
    preview: "scenepack photos/monicasreturn.png",
    notes: "",
  },

  {
    id: "S718C",
    title: "Boyana Catfishing Case",
    season: "7",
    tags: ["angela lopez", "nyla harper", "supporting characters", "action", "comedy"],
    dateAdded: "05-22-2025",
    size: "635.9MB",
    download: "https://mega.nz/file/ttQWmIoQ#SVvvEUqf4z7tO_xCuGT3VL5mJMLYeMNJUNAm06CUJVs",
    preview: "scenepack photos/boyanacase.png",
    notes: "",
  },

  {
    id: "S718B",
    title: "Night Sergeant Lucy Chen",
    season: "7",
    tags: ["lucy chen", "supporting characters", "action", "story arc"],
    dateAdded: "05-20-2025",
    size: "707.3MB",
    download: "https://mega.nz/file/Y1YmxShK#pl1fPvDUA1fTGRPOmFXcx90E1CnOVHsGutEUMNRtKjI",
    preview: "scenepack photos/nightsergeantchen.png",
    notes: "",
  },

  {
    id: "S408A",
    title: "Tim's Father",
    season: "4",
    tags: ["tim bradford", "supporting characters", "angst", "compilation", "story arc"],
    dateAdded: "05-20-2025",
    size: "184.8MB",
    download: "https://mega.nz/file/I8p0RRbI#EQALxPy5ogBOt75HkxfC55DOI3RjIVEMW0GBW17oIKg",
    preview: "scenepack photos/timsfather.png",
    notes: "includes mentions of Tim's father too",
  },

  {
    id: "S718A",
    title: "Chenford Season 7 Finale Recap",
    season: "7",
    tags: ["lucy chen", "tim bradford", "chenford", "broken up chenford", "soft", "romance"],
    dateAdded: "05-16-2025",
    size: "570.5MB",
    download: "https://mega.nz/file/UpJRgILZ#swnvBP2cNHSQ3cYI19tdpIifVLBEkdoeNsI2m2660D8",
    preview: "scenepack photos/chenford7x18.png",
    notes: "",
  },

  {
    id: "S211B",
    title: "Chenford Hugs",
    season: ["2", "4", "5", "6", "7"],
    tags: ["chenford", "lucy chen", "tim bradford", "compilation", "romance", "still updating"],
    dateAdded: "04-26-2025",
    size: "205.8MB",
    download: "https://mega.nz/file/EhAgySTa#Ts7F1S9jZ_l08BlRdPG1iPDCW8yzabIU97MvHhdVGgI",
    preview: "scenepack photos/chenfordhugs.png",
    notes: `<strong id="bolded">goes up to 7x14</strong>
    currently includes:
      • tim rescues lucy from the barrel (2x11)
      • after jackson’s death (4x01)
      • lucy telling tim he is nothing like his father (4x09)
      • tim shows up at lucy’s door after her lucy lesson (5x12)
      • lucy talks to tim about her uc concerns (5x20)
      • laundromat hug (5x21)
      • tim and lucy hug after her jamie hall case (5x21)
      • tim comforts lucy after aaron’s shooting (5x22)
      • tim hugs lucy after the jeff bundy shooting (6x04)
      • lucy hugs tim before he breaks up with her (6x06)
      • lucy hugs tim in the elevator (6x09)
      • tim and lucy hugs after she crashes through a window to save a baby (7x14)`,
  },

  {
    id: "S504A",
    title: "Bailey Falls in Rosalind's Trap",
    season: "5",
    tags: ["bailey nune", "supporting characters", "bailan", "action", "angst", "story arc"],
    dateAdded: "04-26-2025",
    size: "1.12GB",
    download: "https://mega.nz/file/gwRgyaRC#mebt11YCAL4F0y6DnfmQ4SPgb_0LXRQPy_xEjyxzBWE",
    preview: "scenepack photos/bailey5x4.png",
    notes: "",
  },

  {
    id: "S606A",
    title: "The Break Up",
    season: "6",
    tags: ["lucy chen", "tim bradford", "chenford", "broken up chenford", "angst"],
    dateAdded: "04-26-2025",
    size: "125.9MB",
    download: "https://mega.nz/file/dhw0BJzK#RONcdtHUQF-8iqtiT9TkryHmoAyuEsFW5AT1KG1-eSo",
    preview: "scenepack photos/thebreakup.png",
    notes: "",
  },

  {
    id: "S715A",
    title: "Chenford S7 Ep 15",
    season: "7",
    tags: ["lucy chen", "tim bradford", "chenford", "broken up chenford", "soft"],
    dateAdded: "04-24-2025",
    size: "370.9MB",
    download: "https://mega.nz/folder/UWkxWaLb#HW4rxhF_hOA9PiVkpUKaxQ",
    preview: "scenepack photos/chenford7x15.png",
    notes: "",
  },

  {
    id: "S117A",
    title: "Lucy's Parents",
    season: ["1", "2", "3"],
    tags: ["lucy chen", "supporting characters", "compilation", "angst"],
    dateAdded: "04-24-2025",
    size: "1.58GB",
    download: "https://mega.nz/folder/UWE1QJJa#7di7fPYdasRm6EWJsWT-gg",
    preview: "scenepack photos/lucysparents.png",
    notes: "",
  },

  {
    id: "S514B",
    title: "Metro Tim",
    season: "5",
    tags: ["tim bradford", "story arc", "compilation", "action"],
    dateAdded: "04-20-2025",
    size: "2.31GB",
    download: "https://mega.nz/file/hLlCASqC#ofCzrQxBKB3NQfVjNRqFd45y7grgOk02F6LSvkl_IxU",
    preview: "scenepack photos/metrotim.png",
    notes: "",
  },

  {
    id: "S712D",
    title: "The Purge",
    season: "7",
    tags: ["tim bradford", "celina juarez", "lucy chen", "supporting characters", "story arc", "action"],
    dateAdded: "04-04-2025",
    size: "1.05GB",
    download: "https://mega.nz/file/VbFFyIYC#kCIpmCf8knlvvM7W_nGaI5EoRkRrIFsPZmD1UZafTME",
    preview: "scenepack photos/thepurge.png",
    notes: "",
  },

  {
    id: "S712C",
    title: "Connor Craig",
    season: "7",
    tags: ["john nolan", "supporting characters", "comedy", "action", "story arc"],
    dateAdded: "04-04-2025",
    size: "2.18GB",
    download: "https://mega.nz/file/5eEW1bbR#zj85LVPVKXoyUGPP-WJDSipTdc9usOCAE9kx_Zt4iVw",
    preview: "scenepack photos/connorcraig.png",
    notes: "",
  },

  {
    id: "S712B",
    title: "Ben Dover Case",
    season: "7",
    tags: ["angela lopez", "nyla harper", "wesley evers", "story arc", "action"],
    dateAdded: "04-04-2025",
    size: "602.8MB",
    download: "https://mega.nz/file/EXF0RAJR#MuMyhQfL-uH46uwEhFoPF1t3lTHpCsqsRnRukE2_kzg",
    preview: "scenepack photos/bendovercase.png",
    notes: "",
  },

  {
    id: "S712A",
    title: "April Fools Day Chenford",
    season: "7",
    tags: ["lucy chen", "tim bradford", "chenford", "broken up chenford", "soft"],
    dateAdded: "04-04-2025",
    size: "748.3MB",
    download: "https://mega.nz/file/oaN2xAQK#ha-aRt2qZI9wyuZEWFSCeMCcvAsRXw-1XvBMLB1NY08",
    preview: "scenepack photos/aprilfoolsday.png",
    notes: "",
  },

  {
    id: "S513A",
    title: "5 Player Trade",
    season: "5",
    tags: ["lucy chen", "tim bradford", "chenford", "soft"],
    dateAdded: "03-28-2025",
    size: "309.9MB",
    download: "https://mega.nz/file/EDNnWDAS#4eOIQRcDOK1whpCKY-U7d2xxoPoxBKS62Q-9vMQNHdota10c",
    preview: "scenepack photos/5playertrade.png",
    notes: "",
  },

  {
    id: "S711A",
    title: "Shop Talk",
    season: "7",
    tags: ["lucy chen", "tim bradford", "chenford", "broken up chenford", "soft"],
    dateAdded: "03-26-2025",
    size: "53MB",
    download: "https://mega.nz/file/4bknAbYa#iPGsytajxi_NKTe66_zPMykKZHkusw1gBfzLfFDxR-c",
    preview: "scenepack photos/shoptalk.png",
    notes: "",
  },

  {
    id: "S514A",
    title: "Lucy Chen: Fist of Justice",
    season: "5",
    tags: ["lucy chen", "comedy"],
    dateAdded: "03-13-2025",
    size: "125.3MB",
    download: "https://mega.nz/file/8WEmlJBS#kwbBpeSyUAvJ3W2OlAGKtmGCjhyoSUEsoAENziDasPc",
    preview: "scenepack photos/fistofjustice.png",
    notes: "",
  },

  {
    id: "S708A",
    title: "Wildfire",
    season: "7",
    tags: ["lucy chen", "tim bradford", "chenford", "broken up chenford", "hurt & comfort", "protective", "angst"],
    dateAdded: "03-09-2025",
    size: "615.1MB",
    download: "https://mega.nz/file/cesBCBgL#0pNHefmbk70YW-r_M_z12yljjiUVX_i9ZX5x8bbl7yc",
    preview: "scenepack photos/wildfire.png",
    notes: "",
  },

  {
    id: "S706B",
    title: "Turn In Your Ex Day",
    season: "7",
    tags: ["lucy chen", "tim bradford", "chenford", "broken up chenford", "slow burn", "soft"],
    dateAdded: "03-09-2025",
    size: "304.3MB",
    download: "https://mega.nz/file/8OVQ2IZZ#IaAjgId6-W_jF_VAMjboBjMg_qLsczTjjkNIKUuI35w",
    preview: "scenepack photos/turninyourexday.png",
    notes: "",
  },

  {
    id: "S706A",
    title: "Valentines Day Gala Hook Up",
    season: "7",
    tags: ["lucy chen", "tim bradford", "chenford", "broken up chenford", "romance", "slow burn", "soft"],
    dateAdded: "03-09-2025",
    size: "340.5MB",
    download: "https://mega.nz/file/ZStChZyK#UrXQPSxlvOSNaJCG8-QvcP7oSgpG58yPlp2X61zhAK8",
    preview: "scenepack photos/valentinesgala.png",
    notes: "",
  },

  {
    id: "S120A",
    title: "The Virus",
    season: ["1", "2"],
    tags: ["lucy chen", "tim bradford", "chenford", "pre-chenford", "slow burn", "action", "hurt & comfort", "story arc", "angst", "compilation"],
    dateAdded: "03-09-2025",
    size: "528.9MB",
    download: "https://mega.nz/file/tKE0wJ7I#YBtBbodAddD9Qg4mFwuu1bJSnGIJ8_c3Vjele3cRjY4",
    preview: "scenepack photos/thevirus.png",
    notes: "",
  },

  {
    id: "S521A",
    title: "Jamie Hall",
    season: "5",
    tags: ["lucy chen", "tim bradford", "chenford", "undercover ops", "action", "angst", "protective", "story arc"],
    dateAdded: "03-09-2025",
    size: "659.1MB",
    download: "https://mega.nz/file/xSU0hLia#QIIWaVEW8uZVBM-8pT41gxX_Jt30lTdFv9xN1VcjwxM",
    preview: "scenepack photos/jamiehall.png",
    notes: "",
  },

  {
    id: "S501A",
    title: "Dim and Juicy",
    season: "5",
    tags: ["chenford", "pre-chenford", "lucy chen", "tim bradford", "romance", "slow burn", "protective", "undercover ops", "action", "story arc"],
    dateAdded: "03-08-2025",
    size: "772.1MB",
    download: "https://mega.nz/file/wCkH3ZpS#LDbZIRuA7_SLQkUqdBBZzVfabVpZ9IsISi2-Kb81rk0",
    preview: "scenepack photos/dimandjuicy.jpg",
    notes: "",
  },

  {
    id: "S520A",
    title: "Amber",
    season: "5",
    tags: ["lucy chen", "supporting characters", "undercover ops", "story arc", "action"],
    dateAdded: "03-08-2025",
    size: "659.1MB",
    download: "https://mega.nz/file/hDdAEL4L#arBcWm7DtTfhJZ_r0uH_M5_fbJsT9E08QF0Op0CSxNA",
    preview: "scenepack photos/amber.png",
    notes: "",
  },

  {
    id: "S512A",
    title: "Lucy Lesson",
    season: "5",
    tags: ["lucy chen", "tim bradford", "chenford", "romance", "soft", "protective"],
    dateAdded: "03-08-2025",
    size: "609.5MB",
    download: "https://mega.nz/file/ES1WDZJQ#i4vJ7xK8gxd3UftGT2vF2kAmuyWAhUOhRoVQLIUBRko",
    preview: "scenepack photos/lucylesson.jpg",
    notes: "",
  },

  {
    id: "S508A",
    title: "First Dates",
    season: "5",
    tags: ["chenford", "lucy chen", "tim bradford", "romance", "soft", "compilation"],
    dateAdded: "03-07-2025",
    size: "1.48B",
    download: "https://mega.nz/file/9C833RQb#7oS2c1SVQ9AUE_iJuEUySHwFfutQm6yXwVnfQvhRTU0",
    preview: "scenepack photos/firstdates.jpg",
    notes: "",
  },

  {
    id: "S211A",
    title: "Day of Death",
    season: "2",
    tags: ["lucy chen", "chenford", "pre-chenford", "hurt & comfort", "slow burn", "protective", "angst", "action", "story arc", "compilation"],
    dateAdded: "03-06-2025",
    size: "1.89GB",
    download: "https://mega.nz/file/NbEnUbyA#R5ICWZa0ttJGuxkU_uQTlEYkQEHEOKOmSewySAAluzo",
    preview: "scenepack photos/dayofdeath.jpg",
    notes: "",
  }
  
  ]
