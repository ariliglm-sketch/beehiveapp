// The verses the app shows on the Today screen, one per day, rotating by date.
//
// DAILY_VERSES is the reference list. Each VersePack supplies the text of those
// references in one translation, keyed by the same ids.
//
// A pack with an empty text map has not been loaded yet. Until then the app shows
// FALLBACK_TEXT so the card is never blank, and says on screen that it is doing so.
// Once the ULB packs are filled, FALLBACK_TEXT and its pack entry can be deleted.
//
// To fill a pack: keep the ids identical and paste the text from the source named in
// `attribution`. Do not paraphrase or machine-translate Scripture into a pack — take
// it from the published translation.

export type DailyVerse = { id: string; ref: string; reflection?: string };

export const DAILY_VERSES: DailyVerse[] = [
  { id: 'e1', ref: '1 Corinthians 15:58', reflection: 'No one saw you do that. God did, and it counted. This work is mostly made of steps nobody watches.' },
  { id: 'p11', ref: 'Matthew 9:38' },
  { id: 'p12', ref: 'Mark 5:19' },
  { id: 'e2', ref: 'Psalm 126:6', reflection: 'You will not see the shape of this for years. Sow the next seed anyway. That is all any sower has ever done.' },
  { id: 'p13', ref: 'Luke 10:6' },
  { id: 'p14', ref: 'Proverbs 16:3' },
  { id: 'e3', ref: 'Galatians 6:9', reflection: 'Whether that step felt fruitful or flat, it was faithful — and faithfulness is what you were asked for.' },
  { id: 'p21', ref: '1 Peter 3:15' },
  { id: 'p22', ref: 'Romans 1:16' },
  { id: 'e4', ref: '1 Corinthians 3:6', reflection: 'You sowed, you watered, you waited. The growth was never yours to produce and the weight was never yours to carry.' },
  { id: 'p23', ref: 'Mark 4:3' },
  { id: 'p24', ref: 'Acts 5:42' },
  { id: 'e5', ref: 'Mark 4:26-27', reflection: 'The sower sleeps. The growth is not held up by your effort or your understanding. Sow today, and then rest.' },
  { id: 'p31', ref: '2 Corinthians 5:20' },
  { id: 'p32', ref: 'Acts 2:42' },
  { id: 'p33', ref: 'Matthew 28:20' },
  { id: 'p34', ref: 'Acts 17:11' },
  { id: 'p41', ref: 'Acts 2:44-45' },
  { id: 'p42', ref: 'Acts 2:38' },
  { id: 'p43', ref: 'Acts 14:23' },
  { id: 'p44', ref: 'James 1:27' },
  { id: 'p51', ref: 'Mark 3:14' },
  { id: 'p52', ref: '2 Timothy 2:2' },
  { id: 'p54', ref: '1 Thessalonians 1:8' },
];

export type VersePack = {
  id: string;
  name: string;
  shortName: string;
  language: string;
  bundled: boolean;
  license: string;
  attribution: string;
  sourceUrl?: string;
  text: Record<string, string>;
};

export const PACKS: VersePack[] = [
  {
    id: 'en-ulb',
    name: 'Unlocked Literal Bible (English)',
    shortName: 'ULB',
    language: 'English',
    bundled: true,
    license: 'CC BY-SA 4.0',
    attribution:
      'Unlocked Literal Bible, Wycliffe Associates. Licensed under Creative Commons Attribution-ShareAlike 4.0 International. Available at bibleineverylanguage.org.',
    sourceUrl: 'https://content.bibletranslationtools.org',
    text: {
      e1: 'Therefore, my dear brothers, be steadfast and immovable. Always abound in the work of the Lord, because you know that your work in the Lord is not in vain.',
      p11: 'Therefore urgently pray to the Lord of the harvest, so that he may send out laborers into his harvest."',
      p12: 'But Jesus did not permit him, but said to him, "Go to your house and to your people and tell them what the Lord has done for you, and how he has shown you mercy."',
      e2: 'He who goes out weeping, carrying seed for sowing, will return again with shouts of joy, bringing his bundles of grain with him.',
      p13: 'If a person of peace is there, your peace will rest upon him, but if not, it will return to you.',
      p14: 'Commit your works to Yahweh and your plans will succeed.',
      e3: 'Let us not become weary in doing good, for at the right time we will gather in a harvest, if we do not give up.',
      p21: 'Instead, set apart the Lord Christ in your hearts as holy. Always be ready to answer everyone who asks you why you have confidence in God. Do this with meekness and respect.',
      p22: 'For I am not ashamed of the gospel, for it is the power of God for salvation for everyone who believes, for the Jew first and for the Greek.',
      e4: 'I planted, Apollos watered, but God gave the growth.',
      p23: '"Listen, the farmer went out to sow his seed.',
      p24: 'Thereafter every day, in the temple and from house to house, they were continuously teaching and proclaiming Jesus as the Christ.',
      e5: 'He also said, "The kingdom of God is like a man who sows his seed on the ground. He sleeps at night and gets up by day, and the seed sprouts and grows, though he does not know how.',
      p31: 'So we are appointed as representatives of Christ, as though God were making his appeal through us. We plead with you, for the sake of Christ: "Be reconciled to God!"',
      p32: "They continued in the apostles' teaching and fellowship, in the breaking of bread and in prayers.",
      p33: 'Teach them to obey all the things that I have commanded you. See, I am with you always, even to the end of the age."',
      p34: 'Now these people were more noble than those in Thessalonica, for they received the word with all readiness of mind, examining the scriptures daily to see whether these things were so.',
      p41: 'All who believed were together and had all things in common, and they sold their property and possessions and distributed them to all, according to the needs anyone had.',
      p42: 'Then Peter said to them, "Repent and be baptized, each of you, in the name of Jesus Christ for the forgiveness of your sins, and you will receive the gift of the Holy Spirit."',
      p43: 'When they had appointed for them elders in every church, and had prayed with fasting, they entrusted them to the Lord, in whom they had believed.',
      p44: 'Religion that is pure and unspoiled before our God and Father is to help the fatherless and widows in their affliction, and to keep oneself unstained by the world.',
      p51: 'He appointed the twelve (whom he named apostles) so that they might be with him and he might send them to proclaim the message,',
      p52: 'The things you heard from me among many witnesses, entrust them to faithful people who will be able to teach others also.',
      p54: 'For from you the word of the Lord has rung out, and not only in Macedonia and Achaia—everywhere your faith in God has gone out. Therefore we do not need to say anything about it.',
    },
  },
  {
    id: 'tl-ulb',
    name: 'Unlocked Literal Bible (Tagalog)',
    shortName: 'ULB Tagalog',
    language: 'Tagalog',
    bundled: true,
    license: 'CC BY-SA 4.0',
    attribution:
      'Unlocked Literal Bible, Wycliffe Associates. Licensed under Creative Commons Attribution-ShareAlike 4.0 International. Available at bibleineverylanguage.org.',
    sourceUrl: 'https://content.bibletranslationtools.org',
    text: {
      e1: 'Kaya nga, aking mga minamahal na kapatid, maging matatag kayo at huwag patitinag. Lagi kayong managana sa gawain ng Panginoon, dahil alam ninyong ang inyong gawain sa Panginoon ay hindi mawawalan ng kabuluhan.',
      p11: 'Kaya madaliin ninyong idalangin sa Panginoon ng pag-aani, upang makapagpadala siya ng mga manggagawa sa kaniyang anihan."',
      p12: 'Ngunit hindi siya pumayag dito, subalit sinabi niya sa kaniya, "Umuwi ka sa iyong bahay at sa mga kasama mo, at sabihin mo sa kanila kung ano ang ginawa ng Panginoon para sa iyo at kung paano ka niya kinahabagan."',
      e2: 'Siyang umiiyak na lumabas, dala-dala ang binhing ihahasik, babalik muli nang may sigaw ng kagalakan, dala-dala ang kaniyang mga bungkos.',
      p13: 'Kung ang isang taong payapa ay naroon, ang inyong kapayapaan ay mapapasakaniya, ngunit kung hindi, ito ay babalik sa iyo.',
      p14: 'Ipagkatiwala mo ang iyong mga gawain kay Yahweh at magtatagumpay ang mga balak mo.',
      e3: 'Hindi tayo dapat mapagod sa paggawa ng mabuti, dahil sa takdang panahon magkakaroon tayo ng ani kung hindi tayo susuko.',
      p21: 'Sa halip, ibukod-tangi niyo ang Panginoong Cristo sa inyong mga puso bilang banal. Lagi kayong maging handa na sagutin ang bawat nagtatanong sa inyo kung bakit mayroon kayong pagtitiwala sa Diyos. Gawin ninyo ito nang may kahinahunan at paggalang.',
      p22: 'Sapagkat hindi ko ikinahihiya ang ebanghelyo, sapagkat ito ang kapangyarihan ng Diyos upang iligtas ang sinumang sumasampalataya, una ay sa Judio at gayon din sa Griyego.',
      e4: 'Ako ang nagtanim, si Apolos ang nagdilig, ngunit ang Diyos ang nagpapalago.',
      p23: '"Makinig kayo, lumabas ang manghahasik upang maghasik.',
      p24: 'Pagkatapos noon araw-araw sa templo at sa bawat bahay, sila ay patuloy na nagtuturo at ipinapangaral si Jesus bilang Cristo.',
      e5: 'At sinabi niya, "Ang kaharian ng Diyos ay tulad ng isang taong naghasik ng kaniyang binhi sa lupa. Sa gabi siya ay natutulog at sa umaga siya ay bumabangon, at ang binhi ay sumisibol at tumutubo, ngunit hindi niya alam kung paano.',
      p31: 'Kaya kami ay itinalaga bilang mga kinatawan ni Cristo, na para bang ang Diyos mismo ang nakikipag-usap sa inyo sa pamamagitan namin. Ipinakikiusap namin sa inyo, alang-alang kay Cristo: "Makipagkasundo kayo sa Diyos!"',
      p32: 'Nagpatuloy sila sa mga katuruan ng mga apostol at pagsasama-sama, sa pagpipira-piraso ng tinapay at sa pananalangin.',
      p33: 'Turuan sila na sumunod sa lahat ng mga iniutos ko sa inyo. At pakinggan ninyo, Ako ay laging nasa inyo, maging sa katapusan ng mundo."',
      p34: 'Ngayon ang mga taong ito ay mas matalino kaysa sa mga taga Tesalonica, dahil tinanggap nila ang salita nang may kahandaan ng isip, nagsasaliksik ng mga kasulatan araw araw, upang makita kung ang mga bagay na ito ay totoo.',
      p41: 'Ang lahat ng nanampalataya ay nagsama-sama at ibinahagi ang kanilang mga ari-arian, at ipinagbili nila ang kanilang mga pag-aari at mga ari-arian at ipinamahagi sa lahat, ayon sa pangangailangan ng bawat-isa.',
      p42: 'At sinabi ni Pedro sa kanila, "Magsisi at magpabautismo, ang bawat isa sa inyo sa pangalan ni Jesu-Cristo para sa kapatawaran ng inyong mga kasalanan, at inyong tatanggapin ang kaloob ng Banal na Espiritu."',
      p43: 'Nang makapagtalaga sila ng mga nakatatanda sa bawat kapulungan ng mga mananampalataya, at makapanalangin na may pag-aayuno, ipinagkatiwala nila sila sa Panginoon na kanilang pinaniniwalaan.',
      p44: 'Ito ay dalisay at walang karumihang relihiyon sa harap ng ating Diyos at Ama: para tulungan ang mga walang ama at balo sa kanilang kapighatian, at para pangalagaan ang sarili mula sa katiwaliaan ng mundo.',
      p51: 'Itinalaga niya ang Labindalawa (na tinawag niyang mga apostol) para sila ay makasama niya at maaari niya silang isugo upang mangaral,',
      p52: 'At ang mga bagay na narinig mo sa akin kasama ng maraming saksi, ipagkatiwala mo ang mga ito sa mga tapat na tao na kaya ring magturo sa iba.',
      p54: 'Sapagkat mula sa inyo ang salita ng Panginoon ay lumaganap, at hindi lamang sa Macedonia at Acaya. Kundi, sa lahat ng dako kung saan ang inyong pananampalataya sa Diyos ay naibalita. Bilang resulta, hindi na namin kailangang magsalita ng ano pa man.',
    },
  },
];

export const DEFAULT_PACK_ID = 'tl-ulb';

// Temporary. Public domain, so it carries no licence obligation and conflicts with
// nothing. It exists only so the verse card is never empty while the ULB packs above
// are still being loaded. Delete this, FALLBACK_SOURCE, and the fallback branch in
// verseForDate once en-ulb and tl-ulb have their text.
const FALLBACK_TEXT: Record<string, string> = {
  e1: 'Be ye stedfast, unmoveable, always abounding in the work of the Lord, forasmuch as ye know that your labour is not in vain in the Lord.',
  e2: 'He that goeth forth and weepeth, bearing precious seed, shall doubtless come again with rejoicing, bringing his sheaves with him.',
  e3: 'Let us not be weary in well doing: for in due season we shall reap, if we faint not.',
  e4: 'I have planted, Apollos watered; but God gave the increase.',
  e5: 'So is the kingdom of God, as if a man should cast seed into the ground; and should sleep, and rise night and day, and the seed should spring and grow up, he knoweth not how.',
  p11: 'Pray ye therefore the Lord of the harvest, that he would send forth labourers into his harvest.',
  p12: 'Go home to thy friends, and tell them how great things the Lord hath done for thee.',
  p13: 'And if the son of peace be there, your peace shall rest upon it: if not, it shall turn to you again.',
  p14: 'Commit thy works unto the LORD, and thy thoughts shall be established.',
  p21: 'Sanctify the Lord God in your hearts: and be ready always to give an answer to every man that asketh you a reason of the hope that is in you.',
  p22: 'I am not ashamed of the gospel of Christ: for it is the power of God unto salvation.',
  p23: 'Behold, there went out a sower to sow.',
  p24: 'And daily in the temple, and in every house, they ceased not to teach and preach Jesus Christ.',
  p31: 'Now then we are ambassadors for Christ, as though God did beseech you by us.',
  p32: 'And they continued stedfastly in the apostles’ doctrine and fellowship, and in breaking of bread, and in prayers.',
  p33: 'Teaching them to observe all things whatsoever I have commanded you.',
  p34: 'They received the word with all readiness of mind, and searched the scriptures daily.',
  p41: 'And all that believed were together, and had all things common; and sold their possessions and goods, and parted them to all men, as every man had need.',
  p42: 'Repent, and be baptized every one of you in the name of Jesus Christ.',
  p43: 'And when they had ordained them elders in every church, and had prayed with fasting, they commended them to the Lord.',
  p44: 'Pure religion and undefiled before God and the Father is this, To visit the fatherless and widows in their affliction.',
  p51: 'And he ordained twelve, that they should be with him, and that he might send them forth to preach.',
  p52: 'The things that thou hast heard of me among many witnesses, the same commit thou to faithful men, who shall be able to teach others also.',
  p54: 'So that from you the word of the Lord sounded out, not only in Macedonia and Achaia, but also in every place your faith to God-ward is spread abroad.',
};

const FALLBACK_SOURCE = {
  shortName: 'KJV',
  attribution: 'King James Version. Public domain. Shown until the chosen translation is loaded on this phone.',
};

export function packById(id: string) {
  return PACKS.find((p) => p.id === id);
}

export function packIsLoaded(pack: VersePack) {
  return Object.keys(pack.text).length > 0;
}

export function loadedPacks() {
  return PACKS.filter(packIsLoaded);
}

// Index by whole days since the epoch, so every user sees the same verse on a given
// day and the list advances without any stored state.
export function verseIndexForDate(d: Date) {
  const days = Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
  return ((days % DAILY_VERSES.length) + DAILY_VERSES.length) % DAILY_VERSES.length;
}

export function verseForDate(d: Date, packId: string) {
  const verse = DAILY_VERSES[verseIndexForDate(d)];
  const pack = packById(packId) || PACKS[0];
  const own = pack.text[verse.id];
  if (own) {
    return {
      verse,
      text: own,
      pack,
      source: { shortName: pack.shortName, attribution: pack.attribution },
      usedFallback: false,
    };
  }
  return {
    verse,
    text: FALLBACK_TEXT[verse.id],
    pack,
    source: FALLBACK_SOURCE,
    usedFallback: true,
  };
}

// Same lookup as verseForDate, but by a specific verse id rather than today's date.
// Used by a coach picking a verse to send, from the same 24-verse bank.
export function textForVerseId(verseId: string, packId: string) {
  const verse = DAILY_VERSES.find((v) => v.id === verseId);
  if (!verse) return null;
  const pack = packById(packId) || PACKS[0];
  const own = pack.text[verse.id];
  if (own) {
    return { verse, text: own, source: { shortName: pack.shortName, attribution: pack.attribution }, usedFallback: false };
  }
  return { verse, text: FALLBACK_TEXT[verse.id], source: FALLBACK_SOURCE, usedFallback: true };
}
