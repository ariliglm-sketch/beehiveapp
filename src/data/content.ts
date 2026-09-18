// Content ported verbatim from the design handoff:
// project/Church Planting Companion v2.dc.html (PARTS / TOOLS / CIRCLE_STEPS / CHURCH_MARKS / ENCOURAGEMENTS).
// Placeholders (place name, sending church, sample names) are kept as-is per the brief.

export type Step = {
  id: string;
  title: string;
  teaser: string;
  toolLabel?: string;
  toolId?: string;
  verse: string;
  verseRef: string;
  why: string;
  actions: string[];
  heart: string;
  prayer: string;
  hard: string;
};

export type Part = {
  n: number;
  title: string;
  field: string;
  tool: string;
  blurb: string;
  intro: string;
  steps: Step[];
};

export const PARTS: Part[] = [
  {
    n: 1, title: 'Entry', field: 'Empty field', tool: 'oikos',
    blurb: 'Get into the field: pray it, walk it, map the people you already know, and look for a house of peace.',
    intro: 'An empty field is not a closed field. Your first work is entry — prayer, a map of the people you already know, and a search for the household God has already prepared.',
    steps: [
      { id: 'p11', title: 'Pray and walk the place for seven days', teaser: 'Name one place and carry it daily. Ask for laborers and for open households.',
        verse: 'Pray ye therefore the Lord of the harvest, that he would send forth labourers into his harvest.', verseRef: 'Matthew 9:38',
        why: 'Jesus put prayer for laborers before the sending of laborers. Seven days of praying one place by name will tell you more than seven months of planning.',
        actions: ['Write the name of the place at the top of a page.', 'Walk it at morning, midday and after dark, praying as you go.', 'Ask God plainly for a house of peace and for fellow laborers.', 'Write one sentence each day about what you sense or see.'],
        heart: 'You may feel that nothing happened this week. Elijah prayed seven times before the servant saw a cloud the size of a hand. The waiting was not the delay — it was the work.',
        prayer: 'Lord of the harvest, this place is yours. Send laborers, and open one door for me.',
        hard: 'If you missed days, do not start the count over in shame. Pick it up tomorrow.' },
      { id: 'p12', title: 'Map your oikos', teaser: 'List everyone you already know here, and mark who is open, unsure or closed.', toolLabel: 'Open the oikos map',
        verse: 'Go home to thy friends, and tell them how great things the Lord hath done for thee.', verseRef: 'Mark 5:19',
        why: 'The gospel moves along existing relationships — household, work, neighborhood, need. Almost always, the first door God opens is someone already on your list.',
        actions: ['Write every name you can think of: family, work, neighbors, people in need.', 'Mark each one green (open), yellow (unsure) or red (closed for now).', 'Circle three green lights to go to this week.', 'Pray through the whole list once before you start.'],
        heart: 'You already have a field. You did not have to move or raise money to get it. Those names are the assignment.',
        prayer: 'Lord, show me which of these you have already prepared, and give me courage to go first to them.',
        hard: 'If every name feels red, go to the yellow ones with kindness and no agenda. Lights change.' },
      { id: 'p13', title: 'Search for a house of peace', teaser: 'Go two by two. Bless, eat, serve, tell of the kingdom — and stay where you are received.', toolLabel: 'Read the Luke 10 pattern', toolId: 'luke10',
        verse: 'And if the son of peace be there, your peace shall rest upon it: if not, it shall turn to you again.', verseRef: 'Luke 10:6',
        why: 'Jesus sent workers to find receptive households rather than to persuade closed ones. Your job is to search widely and then to stay where you are welcomed.',
        actions: ['Go with one other person, not alone.', 'Bless the household, receive their hospitality, and serve a need.', 'Tell them plainly about Jesus and see how they respond.', 'If they receive you, stay. If not, bless them and go on to the next.'],
        heart: 'Being turned away is not failure — Jesus told his workers to expect it and gave them permission to move on. Rejection means you were obedient enough to be rejected.',
        prayer: 'Lord, lead me to the household you have prepared, and let me leave the others in peace.',
        hard: 'If a door closes hard, do not argue it open. Shake off the dust, thank God, and walk to the next house.' },
      { id: 'p14', title: 'Set your weekly goals', teaser: 'Decide how many conversations and studies you will start each week, and tell someone.',
        verse: 'Commit thy works unto the LORD, and thy thoughts shall be established.', verseRef: 'Proverbs 16:3',
        why: 'Vague intentions produce nothing. A named number — three gospel conversations a week, one new study a month — turns burden into obedience you can actually measure.',
        actions: ['Write your weekly number of gospel conversations.', 'Write your monthly number of new studies to start.', 'Tell one person who will ask you about it each week.', 'Record what actually happened, honestly, in the app.'],
        heart: 'Goals are not pressure from God; they are a handle on obedience. Missing one is information, not condemnation.',
        prayer: 'Lord, keep me from empty plans and from empty busyness. Make my small numbers faithful.',
        hard: 'If you miss your number week after week, cut it in half rather than quitting.' },
    ],
  },
  {
    n: 2, title: 'Gospel', field: 'Seeded field', tool: 'circles',
    blurb: 'Sow widely: your story in fifteen seconds, God’s story in three circles, and a study anyone can join.',
    intro: 'A seeded field takes broad sowing. Learn two short tools well enough to share them anywhere, and expect four different responses to the same seed.',
    steps: [
      { id: 'p21', title: 'Learn your fifteen-second testimony', teaser: 'Before, how, since — five seconds each, ending in a question.', toolLabel: 'Build your story', toolId: 'story',
        verse: 'Sanctify the Lord God in your hearts: and be ready always to give an answer to every man that asketh you a reason of the hope that is in you.', verseRef: '1 Peter 3:15',
        why: 'A short, honest story opens doors that an argument never will. Short enough to say at a bus stop, plain enough that a new believer can copy it next week.',
        actions: ['Write one line about your life before Christ.', 'Write one line about how you came to him.', 'Write one line about what has been different since.', 'Say it out loud five times, then use it once this week.'],
        heart: 'Your story is not too ordinary. The man born blind had one sentence — once I was blind, now I see — and it silenced a council.',
        prayer: 'Lord, let me tell the truth about what you did for me, without decoration and without fear.',
        hard: 'If your story feels dull, say it anyway. God uses plain words more often than powerful ones.' },
      { id: 'p22', title: 'Learn to share God’s story with three circles', teaser: 'God’s design, our brokenness, and Jesus — drawn on any scrap of paper.', toolLabel: 'Walk the three circles',
        verse: 'I am not ashamed of the gospel of Christ: for it is the power of God unto salvation.', verseRef: 'Romans 1:16',
        why: 'A drawing people can redraw travels further than a sermon they can only admire. Three circles gets you from a person’s real brokenness to Christ in a few minutes.',
        actions: ['Learn the three circles until you can draw them from memory.', 'Practice on a believing friend twice before you use it outside.', 'Share it once this week and ask the two closing questions.', 'Hand them the pen and ask them to draw it back to you.'],
        heart: 'You do not have to be a preacher to draw three circles. Most of the people multiplying this tool worldwide are not preachers either.',
        prayer: 'Lord, make me plain and unafraid, and let your gospel do its own work.',
        hard: 'If you forget a part, say so and keep going. An honest stumble is more persuasive than a polished script.' },
      { id: 'p23', title: 'Expect the four responses', teaser: 'Some reject, some receive, some delay, some want to go further. Keep sowing.',
        verse: 'Behold, there went out a sower to sow.', verseRef: 'Mark 4:3',
        why: 'Jesus taught that the same seed meets four kinds of ground. Knowing this in advance keeps you from despair at rejection and from over-reading early enthusiasm.',
        actions: ['After each conversation, note which of the four responses you met.', 'Give the receptive person a next step within a week.', 'Leave the closed person blessed, not argued with.', 'Keep sowing broadly rather than digging at one hard patch.'],
        heart: 'Three out of four soils did not bear fruit in the parable, and Jesus still called the sower faithful. Your yield is not your report card.',
        prayer: 'Lord, help me sow widely and leave the harvest to you.',
        hard: 'When a promising person goes quiet, keep loving them and keep sowing elsewhere. Both at once.' },
      { id: 'p24', title: 'Start a discovery study with a whole household', teaser: 'Read a story, ask the same simple questions, and obey what you find.',
        verse: 'And daily in the temple, and in every house, they ceased not to teach and preach Jesus Christ.', verseRef: 'Acts 5:42',
        why: 'A study in a home, with the family present, becomes the seed of a church. Ask questions rather than lecturing, so the group learns to hear God from the text itself.',
        actions: ['Ask one household to read with you weekly, at a fixed hour.', 'Read one story, then ask: what does it say, what does it mean, what will we do?', 'Ask each person who they will tell before next week.', 'Pray for everyone present, by name, before you leave.'],
        heart: 'Two or three around an open Bible is not a small thing pretending to be a church. Christ promised to be there in the midst of them.',
        prayer: 'Lord, be in the midst of these few, and let your word do what my words cannot.',
        hard: 'If only one person comes, teach that one well. Most works pass through a week like that.' },
    ],
  },
  {
    n: 3, title: 'Discipleship', field: 'Sprouted field', tool: 'thirds',
    blurb: 'Grow what sprouts: the 411, the three-thirds meeting, and obedience to the commands of Christ.',
    intro: 'A sprouted field needs tending, not admiring. Every believer gets trained to make disciples from the first week — not after years of listening.',
    steps: [
      { id: 'p31', title: 'Run the 411 with every new believer', teaser: 'Four questions on one sheet of paper in under an hour: why, who, what, when.', toolLabel: 'Open the 411 sheet', toolId: 'fourone',
        verse: 'Now then we are ambassadors for Christ, as though God did beseech you by us.', verseRef: '2 Corinthians 5:20',
        why: 'A new believer who is sent in the first week becomes a disciple-maker. One who is only taught becomes an audience. The 411 does it in one sitting with one page.',
        actions: ['Why: read 2 Corinthians 5:17-21 and settle their new identity as an ambassador.', 'Who: map their oikos with them, marking green, yellow and red lights.', 'What: teach them your story in fifteen seconds and the three circles.', 'When: set a date and a name — who will they tell, and by when?'],
        heart: 'You are not making a follower of yourself. Every hour spent here is an hour that will still be bearing fruit when you are gone from this place.',
        prayer: 'Lord, give this young believer boldness that does not depend on me.',
        hard: 'If they are frightened to go, go with them the first time. Then let them go without you.' },
      { id: 'p32', title: 'Meet in the three-thirds pattern', teaser: 'Look back, look up, look forward — every gathering both feeds and sends.', toolLabel: 'Open the three-thirds guide',
        verse: 'And they continued steadfastly in the apostles’ doctrine and fellowship, and in breaking of bread, and in prayers.', verseRef: 'Acts 2:42',
        why: 'A repeating pattern teaches a young church more than any lesson about church. Care and accountability first, new truth second, practice and sending last.',
        actions: ['Look back: care for each other, worship, and ask how last week’s obedience went.', 'Look up: read the next passage and ask the three simple questions.', 'Look forward: practice out loud, set goals, and pray for who you will tell.', 'Keep it to ninety minutes so that anyone present could lead it next week.'],
        heart: 'Simple and steady beats impressive and occasional. You are building something meant to outlive your strength.',
        prayer: 'Lord, make our meetings plain and full of you, and keep me from performing.',
        hard: 'If the meeting becomes all teaching, you have drifted. Give the last third back to obedience.' },
      { id: 'p33', title: 'Walk them through the commands of Christ', teaser: 'One command at a time, obeyed before the next is added.', toolLabel: 'See the commands', toolId: 'commands',
        verse: 'Teaching them to observe all things whatsoever I have commanded you.', verseRef: 'Matthew 28:20',
        why: 'The Great Commission ends with obedience, not information. Take the commands of Christ in order and do not move on until the group has actually obeyed the last one.',
        actions: ['Take one command per gathering: repent and believe, be baptized, pray, love, give, and so on.', 'Ask each person what obedience will look like for them this week.', 'Follow up on it the next week, gently and by name.', 'Celebrate obedience out loud when you see it.'],
        heart: 'Obedience is slow and unglamorous and it is the whole point. A group obeying five commands is healthier than one that has heard fifty sermons.',
        prayer: 'Lord, make us doers of your word and not hearers only.',
        hard: 'When someone disobeys, restore them gently. That is itself one of the commands.' },
      { id: 'p34', title: 'Teach them to feed themselves from Scripture', teaser: 'A simple repeatable method, so the work does not stop when you are sick.',
        verse: 'They received the word with all readiness of mind, and searched the scriptures daily.', verseRef: 'Acts 17:11',
        why: 'If they can only hear God’s word through you, the church stops the week you are away. Teach the method and the habit, not just the meaning.',
        actions: ['Teach one simple method and use only that method for a month.', 'Let them answer first, even when the answer is clumsy.', 'Send them home with the next passage and one question.', 'Praise every attempt to open the Bible without you.'],
        heart: 'Handing away the teaching feels like losing your place. It is the surest sign you are planting a church rather than gathering a crowd.',
        prayer: 'Lord, make them hungry for your word, and make me glad when they no longer need me to explain it.',
        hard: 'Where reading is hard, teach by memory, repetition and hearing. The word is not bound by literacy.' },
    ],
  },
  {
    n: 4, title: 'Church', field: 'Harvested field', tool: 'church',
    blurb: 'Form the group into a church: name it, draw the church circle, and do what a church does.',
    intro: 'A group of disciples becomes a church when it takes up what Christ gave his church to do — and knows it is one. None of it needs to be elaborate; all of it needs to be clear.',
    steps: [
      { id: 'p41', title: 'Draw the church circle with the group', teaser: 'Mark which parts of Acts 2 you are doing, and which are missing.', toolLabel: 'Open the church circle',
        verse: 'And they continued steadfastly... And all that believed were together, and had all things common.', verseRef: 'Acts 2:42-47',
        why: 'Let the group see for itself what a church is and where it stands. Self-assessment against Scripture grows ownership; a lecture from you does not.',
        actions: ['Draw the circle and list the marks of a church from Acts 2.', 'Ask the group which ones they are already doing.', 'Circle what is missing and choose one to begin this month.', 'Write down who will lead each part.'],
        heart: 'Most planters are surprised how much of a church already exists in their little group. Let the group be surprised too.',
        prayer: 'Lord, show us plainly what we are and what we still lack.',
        hard: 'If much is missing, do not panic and do not take it all on yourself. Add one thing a month.' },
      { id: 'p42', title: 'Baptize those who believe', teaser: 'Teach it, prepare them, do it soon, and write down the names.',
        verse: 'Repent, and be baptized every one of you in the name of Jesus Christ.', verseRef: 'Acts 2:38',
        why: 'Baptism is the public line between the old life and the new. In Acts it happens quickly, not after a long probation, and it settles who belongs to Christ.',
        actions: ['Teach what baptism means and what it does not mean.', 'Talk with each candidate about their faith and their household.', 'Choose a place and a day, and invite the village if it is safe.', 'Write the names and the date. This is your church roll.'],
        heart: 'Write those names carefully. Years from now that list will be the plainest evidence that God sent you here.',
        prayer: 'Lord, guard these believers as they confess you in front of their neighbors.',
        hard: 'If public baptism would endanger people, do it quietly and honestly. Wisdom is not cowardice.' },
      { id: 'p43', title: 'Name the group a church and appoint its leaders', teaser: 'Say it out loud, appoint local leaders with prayer, and let them lead.',
        verse: 'And when they had ordained them elders in every church, and had prayed with fasting, they commended them to the Lord.', verseRef: 'Acts 14:23',
        why: 'Until the group knows it is a church with its own leaders, it will keep waiting on you. Paul appointed local elders early and then entrusted them to God.',
        actions: ['Tell the group plainly: you are a church, not my Bible study.', 'Name the faithful men the group already trusts.', 'Appoint them openly with prayer and fasting.', 'Agree what you will still do, and what you will not.'],
        heart: 'The day you are no longer needed is not the day you lost your ministry. It is the day the Lord finished what he sent you to do.',
        prayer: 'Lord, this church is yours and not mine. Hold them when I am not there.',
        hard: 'If no one is ready, keep training and keep waiting. Appointing too early has wounded many young churches.' },
      { id: 'p44', title: 'Care for the poor and the sick among you', teaser: 'Name who is in need and let the church, not only you, meet it.',
        verse: 'Pure religion and undefiled before God and the Father is this, To visit the fatherless and widows in their affliction.', verseRef: 'James 1:27',
        why: 'The watching village judges the gospel by how this small church treats its weakest members. Care is part of the witness, not a program added later.',
        actions: ['List the widows, orphans, sick and hungry in the group.', 'Ask the church to meet the need together.', 'Visit each one at home this month.', 'Keep it honest and unshaming.'],
        heart: 'You cannot meet every need and were never asked to. Meet the ones in front of you and leave the rest with God.',
        prayer: 'Lord, make this little church known for mercy before it is known for anything else.',
        hard: 'If the needs overwhelm the group, say so and ask your sending church for help.' },
    ],
  },
  {
    n: 5, title: 'Leadership', field: 'Multiplying leaders', tool: 'map',
    blurb: 'Raise leaders who raise leaders: model, assist, watch, leave — and map the generations.',
    intro: 'The goal was never one church that depends on you. It is churches planting churches — four generations deep — and leaders who train leaders without you in the room.',
    steps: [
      { id: 'p51', title: 'Hand over each task by model, assist, watch, leave', teaser: 'Do it, do it with them, watch them do it, then leave them to it.',
        verse: 'And he ordained twelve, that they should be with him, and that he might send them forth to preach.', verseRef: 'Mark 3:14',
        why: 'Christ trained by nearness and then by absence. Every task you hold — teaching, baptizing, leading the meeting — should travel those four steps deliberately.',
        actions: ['Choose one task you are still doing alone.', 'Model it while they watch, then do it together.', 'Watch them do it and debrief honestly afterwards.', 'Leave it with them for good, and say so publicly.'],
        heart: 'Watching a younger man do clumsily what you do well is one of the hardest joys in ministry. Let it be joy.',
        prayer: 'Lord, give me a generous hand with the work you gave me.',
        hard: 'When they fail publicly, correct privately and defend them publicly. That is how leaders grow.' },
      { id: 'p52', title: 'Find faithful, available, teachable leaders', teaser: 'Character first. Give small work and watch what comes back.',
        verse: 'The things that thou hast heard of me... commit thou to faithful men, who shall be able to teach others also.', verseRef: '2 Timothy 2:2',
        why: 'Paul’s tests were faithfulness and ability to teach others. The loudest and quickest are not always the ones to trust with a church.',
        actions: ['Watch how each person treats their household, their money and their word.', 'Give small responsibilities and see what comes back.', 'Ask the group privately whom they trust.', 'Name two or three and meet with them weekly.'],
        heart: 'If you can name even one faithful person here, God has answered a large prayer. Thank him for that name tonight.',
        prayer: 'Lord, show me the ones you have prepared, and give me patience with those who are not ready.',
        hard: 'If no one seems ready, keep teaching and keep waiting rather than appointing in haste.' },
      { id: 'p53', title: 'Train them to train others, four generations deep', teaser: 'Aim past the next leader to the leader they will train.',
        verse: 'Who shall be able to teach others also.', verseRef: '2 Timothy 2:2',
        why: 'Paul names four generations in one sentence: himself, Timothy, faithful men, and others also. A movement is not two generations deep; it is four and counting.',
        actions: ['Ask each leader: who are you training right now?', 'Sit in once while they train someone, and say nothing.', 'Celebrate the third and fourth generation out loud.', 'Stop doing anything a trained leader can already do.'],
        heart: 'You may never meet the fourth generation. That is not loss — that is what it looks like when the seed is truly out of your hands.',
        prayer: 'Lord, let this go further than I can see or control.',
        hard: 'If multiplication stalls at the second generation, look at whether your tools are simple enough to copy.' },
      { id: 'p54', title: 'Map the generations and pray for the next place', teaser: 'Draw who reached whom, then ask God for the field with no one in it.', toolLabel: 'Open the generational map',
        verse: 'So that from you the word of the Lord sounded out... in every place your faith to God-ward is spread abroad.', verseRef: '1 Thessalonians 1:8',
        why: 'A map shows where the work is multiplying and where it has stopped. It also keeps the aim in front of you: no place left without a church near enough to reach it.',
        actions: ['Draw every group and mark who started whom.', 'Mark which generation each group belongs to.', 'Find the branch that has stopped and go there yourself.', 'Name one unengaged place and begin praying for it with the church.'],
        heart: 'Look at the map and count the names that were not there a year ago. God did that, and he used you.',
        prayer: 'Lord, until there is no place left, keep me in the field and keep me small in my own eyes.',
        hard: 'If the map is one circle, that circle is still a church God planted. Keep sowing.' },
    ],
  },
];

export const ALL_STEPS = PARTS.flatMap((p) =>
  p.steps.map((s) => ({ ...s, part: p.n, partTitle: p.title, partField: p.field, tool: s.toolLabel ? (s.toolId ?? p.tool) : null }))
);

export type ToolItem = { title: string; body: string };
export type Tool = {
  id: string;
  name: string;
  icon: string;
  fieldLabel: string;
  blurb: string;
  verseRef: string;
  intro: string;
  heart?: string;
  items?: ToolItem[];
};

export const TOOLS: Tool[] = [
  { id: 'oikos', name: 'Oikos map', icon: 'UsersThree', fieldLabel: 'Field 1 · Entry', blurb: 'Everyone you already know, marked green, yellow or red.', verseRef: 'Mark 5:19 · Luke 10:5-7',
    intro: 'Your oikos is the household and network you already belong to: family, work, neighbors, people in need. This is where almost every open door is found.',
    heart: 'You do not need a new field. You need to look honestly at the one God already put you in.' },
  { id: 'luke10', name: 'House of peace search', icon: 'DoorOpen', fieldLabel: 'Field 1 · Entry', blurb: 'The Luke 10 pattern for entering a place you have no relationships in.', verseRef: 'Luke 10:1-11',
    items: [
      { title: 'Go two by two', body: 'Never alone. One speaks, one prays, and both remember what happened.' },
      { title: 'Bless the household', body: 'Speak peace over them before you ask anything of them.' },
      { title: 'Eat what they give you', body: 'Receive hospitality. Being served by them makes you a guest, not a salesman.' },
      { title: 'Meet a need and pray', body: 'Serve something real, and pray for the sick or troubled in the house.' },
      { title: 'Tell them the kingdom is near', body: 'Give your story and God’s story plainly, and see how they respond.' },
      { title: 'Stay where you are received', body: 'If they welcome the word, stay and start a study there. If not, bless them and move on without argument.' },
    ],
    intro: 'Jesus gave his workers a way into places where they knew no one — and permission to leave the places that would not receive them.',
    heart: 'Rejection is written into the pattern. Being turned away means you obeyed enough to be turned away.' },
  { id: 'story', name: 'Your story in fifteen seconds', icon: 'ChatCircleText', fieldLabel: 'Field 2 · Gospel', blurb: 'Before, how, since — short enough to say anywhere.', verseRef: '1 Peter 3:15',
    intro: 'Three lines, five seconds each, ending with a question. Short enough to say at a bus stop and plain enough that a new believer can copy it next week.',
    heart: 'Your story is not too ordinary. The blind man had one sentence and it silenced a council.' },
  { id: 'circles', name: 'Three circles', icon: 'CirclesThree', fieldLabel: 'Field 2 · Gospel', blurb: 'God’s story drawn on any scrap of paper.', verseRef: 'Romans 1:16',
    intro: 'Start from the brokenness the person already admits, and draw your way to Christ. Learn it until you can draw it from memory, then teach them to draw it back.',
    heart: 'A drawing people can redraw travels further than a sermon they can only admire.' },
  { id: 'responses', name: 'The four responses', icon: 'Signpost', fieldLabel: 'Field 2 · Gospel', blurb: 'What to do with each kind of response to the gospel.', verseRef: 'Mark 4:3-20',
    items: [
      { title: 'They reject it', body: 'Bless them, do not argue, and keep the door open. Move on and keep sowing.' },
      { title: 'They receive it', body: 'Go further the same week: the 411, baptism, and their own oikos map.' },
      { title: 'They delay', body: 'Stay in relationship without pressure. Offer a study rather than a decision.' },
      { title: 'They want more', body: 'Start a study in their home with their whole household present.' },
    ],
    intro: 'The same seed meets four kinds of ground. Knowing that in advance keeps you from despair at rejection and from over-reading early enthusiasm.',
    heart: 'Three of the four soils bore no fruit, and Jesus still called the sower faithful.' },
  { id: 'fourone', name: 'The 411', icon: 'FileText', fieldLabel: 'Field 3 · Discipleship', blurb: 'Four questions, one page, under an hour.', verseRef: '2 Corinthians 5:17-21',
    items: [
      { title: 'Why? Identity', body: 'Read 2 Corinthians 5:17-21. They are a new creation and an ambassador — that is the reason to go, before any method.' },
      { title: 'Who? Their oikos', body: 'Map their own people with them and mark the green lights. They already have a field.' },
      { title: 'What? Two stories', body: 'Teach them their fifteen-second testimony and the three circles, and have them practice both on you.' },
      { title: 'When? Goals', body: 'Set a name and a date: who will you tell, and by when? Then follow up on it.' },
    ],
    intro: 'Train every new believer and every willing believer with four questions on one sheet of paper. Done in an hour, it turns a convert into a worker.',
    heart: 'A believer sent in the first week becomes a disciple-maker. One who is only taught becomes an audience.' },
  { id: 'thirds', name: 'The three-thirds meeting', icon: 'ClockCountdown', fieldLabel: 'Field 3 · Discipleship', blurb: 'Look back, look up, look forward — the pattern of every gathering.', verseRef: 'Acts 2:42',
    items: [
      { title: 'Look back — one third', body: 'Care for one another, worship, and account for last week’s obedience: what did you do, who did you tell?' },
      { title: 'Look up — one third', body: 'Read the next passage. Ask what it says, what it means, and what we will do. Let them answer first.' },
      { title: 'Look forward — one third', body: 'Practice out loud in pairs, set goals for the week, name who you will tell, and pray for each other by name.' },
    ],
    intro: 'Two thirds of the meeting is care, accountability and practice; only one third is new teaching. That balance is what makes disciples rather than listeners.',
    heart: 'If your meeting becomes all teaching, you have drifted. Give the last third back to obedience.' },
  { id: 'commands', name: 'Commands of Christ', icon: 'ListChecks', fieldLabel: 'Field 3 · Discipleship', blurb: 'The first obediences, one at a time.', verseRef: 'Matthew 28:20',
    items: [
      { title: 'Repent and believe', body: 'Turn from sin, trust Christ. Mark 1:15' },
      { title: 'Be baptized', body: 'Confess him publicly in water. Matthew 28:19' },
      { title: 'Pray', body: 'Speak to the Father simply and often. Matthew 6:9-13' },
      { title: 'Make disciples', body: 'Go and tell, and teach them to obey. Matthew 28:19-20' },
      { title: 'Love', body: 'God first, then neighbor, then one another. Matthew 22:37-39' },
      { title: 'The Lord’s supper', body: 'Break bread together and remember him. Luke 22:19-20' },
      { title: 'Give', body: 'Generously and quietly. Matthew 6:1-4' },
      { title: 'Gather', body: 'Meet as his church and do not forsake it. Hebrews 10:25' },
    ],
    intro: 'Take the commands in order and do not add the next until the last has been obeyed. Obedience, not information, is the aim of the Commission.',
    heart: 'A group obeying five commands is healthier than one that has heard fifty sermons.' },
  { id: 'church', name: 'Church circle', icon: 'CircleDashed', fieldLabel: 'Field 4 · Church', blurb: 'Acts 2 marks of a church — which ones are present?', verseRef: 'Acts 2:36-47',
    intro: 'Draw the circle with your group and let them mark what they already do and what is missing. Ownership grows from their own honest assessment.',
    heart: 'Most planters are surprised how much of a church already exists in their little group.' },
  { id: 'map', name: 'Generational map', icon: 'GitFork', fieldLabel: 'Field 5 · Leadership', blurb: 'Who reached whom, and how deep it has gone.', verseRef: '2 Timothy 2:2',
    intro: 'Draw every group and mark who started whom. The map shows where multiplication is alive and where it has stopped — and the stopped branch is where you go next.',
    heart: 'Count the names on this map that were not there a year ago. God did that.' },
  { id: 'levels', name: 'Five levels of leadership', icon: 'Stairs', fieldLabel: 'Field 5 · Leadership', blurb: 'From new believer to movement leader, and what each needs.', verseRef: '2 Timothy 2:2',
    items: [
      { title: 'Level 1 · Seed sower', body: 'Shares story and gospel, prays for the lost. Needs: the 411 and someone to go with.' },
      { title: 'Level 2 · Church planter', body: 'Gathers and forms one group into a church. Needs: church circle, commands of Christ.' },
      { title: 'Level 3 · Church multiplier', body: 'Starts groups that start groups. Needs: coaching, generational map, MAWL.' },
      { title: 'Level 4 · Multiplication trainer', body: 'Trains other planters and multipliers. Needs: training rollout and honest peers.' },
      { title: 'Level 5 · Movement catalyst', body: 'Catalyzes work across a whole region or people. Needs: prayer cover and accountability.' },
    ],
    intro: 'Know which level each of your people is on and give them the next tool, not every tool. Training above someone’s level discourages them; training below it bores them.',
    heart: 'You do not have to be a level five. Almost all of this work is done by ones and twos.' },
];

export const CIRCLE_STEPS = [
  { label: 'God’s design', circle: 1, say: 'God made a good world and made us for it — to know him, and to live at peace with him and each other.', note: 'Start in the good. Most people have never heard that the world is broken from something, not just broken.' },
  { label: 'Brokenness', circle: 2, say: 'We went our own way instead of his. That is sin, and it broke everything: God, each other, the world, ourselves.', note: 'Use the brokenness the person has already told you about. Their own words, not a category.' },
  { label: 'Our own repair', circle: 2, say: 'We try to get back on our own — religion, money, drink, work, another relationship — and we end up in the same brokenness.', note: 'Draw arrows out of the broken circle that curve back into it. Ask what they have tried.' },
  { label: 'Jesus', circle: 3, say: 'God came himself. Jesus lived the life we could not live, died for our sin, and rose from the dead.', note: 'Do not rush this. It is the only circle that does what the others cannot.' },
  { label: 'Repent and believe', circle: 3, say: 'If we turn from our own way and trust him, he forgives us and brings us back into God’s design — now and forever.', note: 'Then ask two questions: where do you see yourself in this picture, and would you like to follow Jesus today?' },
];

export const CHURCH_MARKS = [
  { id: 'm1', label: 'The gospel and repentance', ref: 'Acts 2:36-38' },
  { id: 'm2', label: 'Baptism', ref: 'Acts 2:38, 41' },
  { id: 'm3', label: 'The word taught', ref: 'Acts 2:42' },
  { id: 'm4', label: 'Prayer', ref: 'Acts 2:42' },
  { id: 'm5', label: 'The Lord’s supper', ref: 'Acts 2:42, 46' },
  { id: 'm6', label: 'Fellowship and care for the needy', ref: 'Acts 2:44-45' },
  { id: 'm7', label: 'Worship and praise', ref: 'Acts 2:47' },
  { id: 'm8', label: 'Giving', ref: 'Acts 2:44-45' },
  { id: 'm9', label: 'Leaders and sending', ref: 'Acts 14:23' },
];

export const GENERATIONS = [
  { gen: 'G1', name: 'Nyakach · Mama Auma’s house', note: 'Started by you, 6 August. Eleven adults, five baptized.', stage: 'Church', tone: 'accent' as const, indent: 0 },
  { gen: 'G2', name: 'Market road group', note: 'Started by Peter Ochieng after his 411. Four adults.', stage: 'Group', tone: 'neutral' as const, indent: 1 },
  { gen: 'G2', name: 'Fisherman’s group, lakeside', note: 'Started by Mama Auma’s daughter. Meets Sundays.', stage: 'Group', tone: 'neutral' as const, indent: 1 },
  { gen: 'G3', name: 'Joseph’s family', note: 'Started from the market road group. Two weeks old.', stage: 'Study', tone: 'outline' as const, indent: 2 },
  { gen: 'G4', name: 'Kadibo · not yet begun', note: 'No church, no worker. Named in prayer every gathering.', stage: 'Praying', tone: 'accent2' as const, indent: 3 },
];

export const MAP_ADVICE = 'Three generations are on the map and the fourth is being prayed for. The branch to watch is the lakeside group — it has not yet started anything. Go and sit with them.';

export const ENCOURAGEMENTS = [
  { title: 'That was obedience.', body: 'No one saw you do that. God did, and it counted. This work is mostly made of steps nobody watches.', verse: 'Be ye steadfast, unmoveable, always abounding in the work of the Lord, forasmuch as ye know that your labour is not in vain in the Lord.', ref: '1 Corinthians 15:58' },
  { title: 'One more seed sown.', body: 'You will not see the shape of this for years. Sow the next seed anyway. That is all any sower has ever done.', verse: 'He that goeth forth and weepeth, bearing precious seed, shall doubtless come again with rejoicing, bringing his sheaves with him.', ref: 'Psalm 126:6' },
  { title: 'God is not in a hurry.', body: 'Whether that step felt fruitful or flat, it was faithful — and faithfulness is what you were asked for.', verse: 'Let us not be weary in well doing: for in due season we shall reap, if we faint not.', ref: 'Galatians 6:9' },
  { title: 'He is building it.', body: 'You sowed, you watered, you waited. The growth was never yours to produce and the weight was never yours to carry.', verse: 'I have planted, Apollos watered; but God gave the increase.', ref: '1 Corinthians 3:6' },
  { title: 'The seed grows while you sleep.', body: 'Jesus said the farmer sleeps and rises and the seed springs up, he knows not how. Go to bed. It is still growing.', verse: 'So is the kingdom of God, as if a man should cast seed into the ground; and should sleep, and rise night and day, and the seed should spring and grow up, he knoweth not how.', ref: 'Mark 4:26-27' },
];
