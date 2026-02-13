import { Users, CalendarDays, Gamepad2, ListChecks, Star, MapPin, Beer } from 'lucide-react';

export type TabId = 'cast' | 'schedule' | 'game' | 'info';

export const tabs = [
  { id: 'cast' as TabId, name: '출연진', icon: Users },
  { id: 'schedule' as TabId, name: '큐시트', icon: CalendarDays },
  { id: 'game' as TabId, name: '게임/도구', icon: Gamepad2 },
  { id: 'info' as TabId, name: '체크/맛집', icon: ListChecks },
];

export const cast = [
    {
        emoji: '👴',
        name: '장인어른',
        tags: ['#조용한_관찰자', '#부드러운_탐험가'],
        color: 'blue'
    },
    {
        emoji: '👵',
        name: '장모님',
        tags: ['#탁구의_고수', '#경주_큰손_셰프'],
        color: 'pink'
    },
    {
        emoji: '👩',
        name: '엄마',
        tags: ['#웃음_전도사', '#활동파_에너지원'],
        color: 'green'
    },
    {
        emoji: '🙋‍♂️',
        name: '나 (언수PD)',
        tags: ['#듬직한_메인MC', '#계획형_네비게이터'],
        color: 'yellow'
    },
    {
        emoji: '🙋‍♀️',
        name: '다혜 (대장)',
        tags: ['#결단력_있는_ISFP', '#실질적_길잡이'],
        color: 'purple'
    },
    {
        emoji: '👨‍🎓',
        name: '처남',
        tags: ['#느림의_미학', '#착한_막내_조커'],
        color: 'red'
    }
];

export const schedule = [
    {
        day: '15',
        title: 'DAY 1: 경주 입성 & 홈파티',
        color: 'blue',
        events: [
            { icon: '🛒', time: '출발 전', description: '트레이더스 장보기' },
            { icon: '🏠', time: '15:00', description: '체크인 및 휴식' },
            { icon: '♨️', time: '17:00~19:00', description: '가족 사우나', highlight: true },
            { icon: '🍱', time: '저녁', description: '트레이더스 만찬 파티' }
        ]
    },
    {
        day: '16',
        title: 'DAY 2: 관광 & 야경 투어',
        color: 'pink',
        events: [
            { icon: '🚙', time: '낮', description: '관광지 및 맛집 투어' },
            { icon: '♨️', time: '오후', description: '1시간 짧은 힐링 사우나' },
            { icon: '🌙', time: '19:00', description: '동궁과 월지 야경', highlight: true },
            { icon: '🎲', time: '밤', description: '보드게임 및 수다 지옥' }
        ]
    },
    {
        day: '17',
        title: 'DAY 3: 에스코트 작전',
        color: 'green',
        mission: {
            title: '🏁 최종 미션: 어머님 에스코트',
            description: '부부가 두 어머님을 모시고 장모님 댁으로 모셔다 드리고 종료!'
        }
    }
];

export const games = [
    { id: 'person' as const, title: '세대격차 인물 퀴즈', color: 'red', description: '시대를 넘나드는 유명 인물을 맞혀보세요!' },
    { id: 'word' as const, title: '네 글자 이어말하기', color: 'orange', description: '네 글자 단어로 대화를 이어가세요!' },
    { id: 'song' as const, title: '노래 전주 1초 듣기', color: 'pink', description: '단 1초의 전주만 듣고 노래 제목을 맞혀보세요!' },
    { id: 'body' as const, title: '몸으로 말해요', color: 'purple', description: '오직 몸짓으로만 제시어를 설명하세요!' },
    { id: 'pitch' as const, title: '절대음감 릴레이', color: 'green', description: '어려운 발음의 문장을 틀리지 않고 이어 말하세요!' },
    { id: 'eng' as const, title: '훈민정음 (No English)', color: 'blue', description: '영어 사용 시 벌금! 적용 상황을 뽑아보세요.' },
    { id: 'jc' as const, title: '전지적 참견 시점', color: 'teal', description: '각자의 역할을 뽑아 과몰입 해보세요!' },
    { id: 'wake' as const, title: '기상 미션', color: 'indigo', description: '아침을 여는 간단한 미션을 수행하세요.' },
];


export const checklist = [
    { id: 'shop', text: '트레이더스 장보기 (고기/밀키트)' },
    { id: 'swim', text: '수영복 & 사우나 전용 타월' },
    { id: 'boardgame', text: '스플랜더 & 모두의마블' },
    { id: 'fine', text: '벌금통' },
    { id: 'mind', text: '불만을 가지지 않겠다!는 마음가짐' },
];

export const restaurants = [
    { name: '동궁과 월지', url: 'https://map.naver.com/p/search/동궁과월지', icon: Star },
    { name: '함양집', url: 'https://map.naver.com/p/search/함양집', icon: Beer },
    { name: '교리김밥', url: 'https://map.naver.com/p/search/교리김밥', icon: MapPin },
    { name: '황리단길', url: 'https://map.naver.com/p/search/황리단길', icon: MapPin },
];

export const tripInfo = {
  name: "2026 (언)수다(혜) 설특집 경주 패밀리 아케이드",
  dates: "2026.02.15 - 02.17",
  description: "천년고도 경주에서 펼쳐지는 6인 가족의 리얼 아케이드! 가족 간의 화합을 다지고 즐거운 추억을 만들기 위한 여행. 예능 프로그램 컨셉으로 다양한 게임과 활동이 준비되어 있음.",
  activities: schedule.flatMap(s => s.events ? s.events.map(e => e.description) : [s.mission?.title || '']),
  familyMembers: cast.map(c => `${c.name} (${c.tags.join(', ')})`),
};
