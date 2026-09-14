// The full Beehive toolbox.
//
// content.ts holds the tools that came over from the original design handoff.
// This file adds the remaining No Place Left tools and exports ALL_TOOLS, the
// two sets merged and sorted back into field order (Entry -> Gospel ->
// Discipleship -> Church -> Leadership).
//
// Screens should import ALL_TOOLS from here rather than TOOLS from content.ts.
// Any tool that supplies an `items` array renders automatically in ToolScreen,
// so adding a tool here is all that is needed to make it appear in the app.

import { TOOLS, type Tool } from './content';

export const EXTRA_TOOLS: Tool[] = [
  {
    id: 'dbs',
    name: 'Seven stories of hope',
    icon: 'BookOpen',
    fieldLabel: 'Field 2 · Gospel',
    blurb: 'Seven Bible stories for a seeker, one a week.',
    verseRef: 'Acts 17:11 · 1 Peter 3:15',
    intro:
      'A discovery study for someone who is curious about Jesus but not ready to decide. Read one story a week and ask the same three questions every time: what does it say, what does it mean, what will we do about it? You are not teaching — you are letting them find him for themselves.',
    heart:
      'Do not rush a yellow light into a decision. Seven weeks is not slow; it is how long it takes an honest person to meet Jesus in his own words.',
    items: [
      { title: 'Hope for the rejected', body: 'Luke 7:36-50 — the woman who washed his feet, and the room that despised her.' },
      { title: 'Hope for the non-religious', body: 'Luke 18:9-17 — the Pharisee, the tax collector, and who went home forgiven.' },
      { title: 'Hope changes things', body: 'Luke 19:1-10 — Zacchaeus, and what happened to his money the same day.' },
      { title: 'Hope forgives', body: 'Matthew 18:21-35 — the servant who was forgiven much and forgave nothing.' },
      { title: 'Hope through death', body: 'Luke 22:66 - 23:25 — the trial, and what he was condemned for.' },
      { title: 'Hope rose from the dead', body: 'Luke 24:1-20 — the empty tomb and the women nobody believed.' },
      { title: 'Hope is waiting for you', body: 'Luke 15:11-32 — the son who came home and the father who ran.' },
    ],
  },
  {
    id: 'sword',
    name: 'Sword Bible study',
    icon: 'Sword',
    fieldLabel: 'Field 3 · Discipleship',
    blurb: 'Six questions drawn on a sword — works on any passage.',
    verseRef: 'Hebrews 4:12',
    intro:
      'Draw a sword pointing upward. The tip points to heaven, the handle is held by people, and the two blades carry four questions remembered as S.P.E.C. Read or tell the story first, then ask the six questions one at a time and let the group answer. It works on any passage, and a new believer can lead it next week.',
    heart:
      'The point is not a clever drawing. It is that the group can open the Bible without you and still hear from God.',
    items: [
      { title: 'The tip — what do we learn about God?', body: 'It points to heaven. What does this passage show about God, Jesus, or the Holy Spirit?' },
      { title: 'The handle — what do we learn about people?', body: 'It is held by people. What does this show about us, our need, or our hearts?' },
      { title: 'S — is there a sin to avoid?', body: 'Left blade. Name it plainly, without shaming anyone in the room.' },
      { title: 'P — is there a promise to believe?', body: 'Left blade. What has God said here that we can hold on to this week?' },
      { title: 'E — is there an example to follow?', body: 'Right blade. Who in this story did what we should do?' },
      { title: 'C — is there a command to obey?', body: 'Right blade. Then ask each person what they will do about it before next week.' },
    ],
  },
  {
    id: 'healthy',
    name: 'Healthy church handy guide',
    icon: 'Hand',
    fieldLabel: 'Field 4 · Church',
    blurb: 'Five fingers, five purposes — check the health of your church.',
    verseRef: 'Matthew 22:37-39 · Matthew 28:19-20',
    intro:
      'Hold up one hand. The five fingers are the five purposes every healthy church is built on, drawn from the Great Commandment and the Great Commission. In the palm, remember P-O-U-C-H: participative rather than passive, obedience as the measure of success, unpaid leaders, cells kept small, meeting in homes. Go finger by finger with the group and ask honestly which ones are alive among you.',
    heart:
      'A missing finger is not a verdict on your church. It is simply the next thing to begin, and it is usually smaller than you fear.',
    items: [
      { title: 'Worship', body: 'Do we praise God together, in a way anyone present could lead?' },
      { title: 'Fellowship', body: 'Do we know each other, eat together, and carry each other’s burdens?' },
      { title: 'Ministry', body: 'Do we serve the poor, the sick and the weak among us and around us?' },
      { title: 'Discipleship', body: 'Is someone here being taught to obey Christ, one command at a time?' },
      { title: 'Evangelism and missions', body: 'Is this church telling others, and sending someone further out?' },
    ],
  },
  {
    id: 'mawl',
    name: 'Model, assist, watch, leave',
    icon: 'Path',
    fieldLabel: 'Field 5 · Leadership',
    blurb: 'The four steps for handing any task to someone else.',
    verseRef: 'Mark 3:14 · 2 Timothy 2:2',
    intro:
      'Take one task you are still doing alone — leading the meeting, telling the gospel, baptizing, starting a study — and walk it through these four steps deliberately. Most leaders stop after the second step and wonder why nothing multiplies.',
    heart:
      'Leaving is not abandoning. It is the step Christ took with twelve unfinished men, and it is the only one that makes the work outlast you.',
    items: [
      { title: 'Model — you do it, they watch', body: 'Do it in front of them on purpose, and tell them beforehand to watch for how, not just what.' },
      { title: 'Assist — you do it together', body: 'Hand them a part of it. Stay beside them and let them feel the weight of it.' },
      { title: 'Watch — they do it, you say nothing', body: 'Sit at the back and keep quiet, even when it is clumsy. Debrief afterwards, honestly and kindly.' },
      { title: 'Leave — they do it without you', body: 'Give it away publicly so the group knows it is theirs now, and do not take it back.' },
    ],
  },
];

// Field order for the tools list. Ids not named here fall to the end, so this
// stays safe if TOOLS in content.ts gains or loses an entry.
const ORDER = [
  'oikos',
  'luke10',
  'story',
  'circles',
  'responses',
  'dbs',
  'fourone',
  'thirds',
  'commands',
  'sword',
  'church',
  'healthy',
  'map',
  'levels',
  'mawl',
];

const rank = (id: string) => {
  const i = ORDER.indexOf(id);
  return i === -1 ? ORDER.length : i;
};

export const ALL_TOOLS: Tool[] = [...TOOLS, ...EXTRA_TOOLS].sort(
  (a, b) => rank(a.id) - rank(b.id)
);
