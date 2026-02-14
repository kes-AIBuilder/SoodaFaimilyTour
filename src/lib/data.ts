import { Users, CalendarDays, Gamepad2, ListChecks, Star, MapPin, Beer } from 'lucide-react';

export type TabId = 'cast' | 'schedule' | 'game' | 'info';

export const tabs = [
  { id: 'cast' as TabId, name: '출연진', icon: Users },
  { id: 'schedule' as TabId, name: '일정', icon: CalendarDays },
  { id: 'game' as TabId, name: '게임/도구', icon: Gamepad2 },
  { id: 'info' as TabId, name: '체크/맛집', icon: ListChecks },
];

export const cast = [
    {
        emoji: '👨‍🦰',
        name: '장인어른',
        tags: ['#조용한_관찰자', '#부드러운_탐험가'],
        color: 'blue'
    },
    {
        emoji: '👩‍🦰',
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
        day: '1',
        title: 'DAY 1: 경주 입성 & 홈파티',
        color: 'blue',
        events: [
            { icon: '🛒', time: '09:30', description: '트레이더스 출발' },
            { icon: '🛒', time: '10:00', description: '트레이더스 장보기' },
            { icon: '🍴', time: '12:00', description: '감포 수협활어직판장 점심식사' },
            { icon: '🏠', time: '14:00', description: '테르메아 체크인 및 휴식, 수영' },
            { icon: '♨️', time: '17:00 ~ 19:00', description: '가족 사우나', highlight: true },
            { icon: '🍱', time: '20:00', description: '트레이더스에서 사온걸로 저녁 해결' },
            { icon: '🎲', time: '밤', description: '보드게임 (라스베가스, 모두의마블)' }
        ]
    },
    {
        day: '2',
        title: 'DAY 2: 관광 & 야경 투어',
        color: 'pink',
        events: [
            { icon: '☕', time: '08:00 ~ 09:00', description: '조식 시간' },
            { icon: '🏊', time: '10:00', description: '오전 수영 타임' },
            { icon: '🚙', time: '14:00', description: '나정항 부근 관광 및 카페' },
            { icon: '♨️', time: '20:00 ~ 21:00', description: '가족 사우나 타임', highlight: true }
        ]
    },
    {
        day: '3',
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
    { id: 'wake' as const, title: '기상 미션', color: 'indigo', description: '아침을 여는 간단한 미션을 수행하세요.' },
];


export const checklist = [
    { id: 'shop', text: '트레이더스 장보기 (고기/밀키트)' },
    { id: 'swim', text: '수영복 & 사우나 전용 타월' },
    { id: 'boardgame', text: '라스베가스 & 모두의마블' },
    { id: 'fine', text: '벌금통' },
    { id: 'mind', text: '불만을 가지지 않겠다!는 마음가짐' },
];

export const restaurants = [
    { name: '감포 수협활어직판장', url: 'https://map.naver.com/p/search/감포수협활어직판장', icon: Beer },
    { name: '경주 테르메아', url: 'https://map.naver.com/p/search/경주테르메아', icon: MapPin },
    { name: '나정항', url: 'https://map.naver.com/p/search/나정항', icon: MapPin },
    { name: '나정고운모래해변', url: 'https://map.naver.com/p/search/나정고운모래해변', icon: MapPin },
    { name: '나정항 주변 예쁜 카페', url: 'https://map.naver.com/p/search/나정해변%20카페', icon: Star },
];

export const tripInfo = {
  name: "2026 설특집 경주 패밀리 아케이드",
  dates: "2026.02.15 - 02.17",
  description: "천년고도 경주에서 펼쳐지는 6인 가족의 리얼 아케이드! 가족 간의 화합을 다지고 즐거운 추억을 만들기 위한 여행. 예능 프로그램 컨셉으로 다양한 게임과 활동이 준비되어 있음.",
  activities: schedule.flatMap(s => s.events ? s.events.map(e => e.description) : [s.mission?.title || '']),
  familyMembers: cast.map(c => `${c.name} (${c.tags.join(', ')})`),
};
