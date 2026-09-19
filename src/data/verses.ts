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
  { id: 'p53', ref: '2 Timothy 2:2' },
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
    text: {},
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
    text: {},
  },
  {
    id: 'tl-asnd',
    name: 'Ang Salita ng Diyos',
    shortName: 'ASND',
    language: 'Tagalog',
    bundled: false,
    license: 'CC BY-SA 4.0',
    attribution:
      'Biblica® Open Ang Salita ng Diyos™. Copyright © 2009, 2011, 2014 by Biblica, Inc. The original work by Biblica, Inc. is available for free at www.biblica.com and open.bible. Licensed under Creative Commons Attribution-ShareAlike 4.0 International.',
    sourceUrl: 'https://open.bible',
    text: {},
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
  p53: 'Who shall be able to teach others also.',
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
  return verseTextForId(DAILY_VERSES[verseIndexForDate(d)].id, packId);
}

// Looks up one verse by its DAILY_VERSES id, independent of the date rotation —
// used anywhere else in the app that quotes one of these same references (the
// step screens, for instance) so the reader's chosen translation applies there too.
// Every id passed in must have a DAILY_VERSES entry; content.ts and verses.ts are
// kept in sync on that.
export function verseTextForId(id: string, packId: string) {
  const verse = DAILY_VERSES.find((v) => v.id === id)!;
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
