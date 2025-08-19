// 공통 DOM 생성 헬퍼 함수들
const DOMHelpers = {
    // 기본 통계 카드 생성
    createStatCard: (value, title, unit, color) => `
        <div class="stat-card ${color} rounded-xl p-6 text-center">
            <div class="text-4xl font-bold text-yellow-300">${value}</div>
            <div class="text-lg font-medium mt-2">${title}</div>
            <div class="text-sm opacity-75 mt-1">${unit}</div>
        </div>
    `,
    
    // 팀 카드 생성
    createTeamCard: (team) => `
        <div class="${team.color} rounded-xl p-6">
            <h3 class="text-3xl font-bold text-center mb-4 text-yellow-300">${team.name}</h3>
            <div class="space-y-4">
                <div class="flex justify-between items-center">
                    <span class="text-lg">총 캐릭터</span>
                    <span class="text-2xl font-bold text-yellow-300">${team.data.characters.toLocaleString()}개</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-lg">평균 레벨</span>
                    <span class="text-2xl font-bold text-yellow-300">${team.data.avgLevel}</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-lg">생존율</span>
                    <span class="text-2xl font-bold text-green-400">${team.data.survival}%</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-lg">TOP200 진입</span>
                    <span class="text-2xl font-bold text-purple-400">${team.data.top200}명</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-lg">총 경험치</span>
                    <span class="text-xl font-bold text-orange-400">${(team.data.totalExp / 1e9).toFixed(1)}B</span>
                </div>
                <div class="text-sm mt-4 bg-gray-900 rounded p-3">
                    <div class="grid grid-cols-2 gap-2">
                        <div>60+ 레벨: <span class="font-bold text-cyan-400">${team.data.above60}명</span></div>
                        <div>70+ 레벨: <span class="font-bold text-cyan-400">${team.data.above70}명</span></div>
                        <div>80+ 레벨: <span class="font-bold text-cyan-400">${team.data.above80}명</span></div>
                        <div>90+ 레벨: <span class="font-bold text-cyan-400">${team.data.above90}명</span></div>
                    </div>
                </div>
            </div>
        </div>
    `,
    
    // 순위 아이템 생성
    createRankItem: (rank, character, account, bgClass = "bg-gray-900") => `
        <div class="flex items-center justify-between p-2 ${bgClass} rounded">
            <div class="flex items-center space-x-2">
                <span class="text-lg font-bold w-8 text-yellow-400">${rank}위</span>
                <div>
                    <div class="text-sm font-bold">${character}</div>
                    <div class="text-xs opacity-75">${account}</div>
                </div>
            </div>
        </div>
    `,
    
    // 클래스 선호도 아이템 생성
    createClassPreferenceItem: (index, className, count) => `
        <div class="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
            <div class="flex items-center space-x-3">
                <span class="text-lg font-bold w-8">${index + 1}.</span>
                <span class="text-lg">${className}</span>
            </div>
            <span class="text-xl font-bold text-yellow-300">${count.toLocaleString()}개</span>
        </div>
    `,
    
    // 프로그레스 바 아이템 생성
    createProgressBarItem: (label, percentage, value, color, labelWidth = "w-32") => `
        <div class="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
            <div class="flex items-center space-x-4">
                <span class="text-lg font-bold ${labelWidth}">${label}</span>
                <div class="w-80 bg-gray-600 rounded-full h-5">
                    <div class="chart-bar h-full ${color} rounded-full" style="width: ${percentage}%"></div>
                </div>
            </div>
            <span class="text-xl font-bold text-yellow-300">${value}</span>
        </div>
    `,
    
    // 레벨별 사망률 아이템 생성
    createDeathRateItem: (range, deathData) => `
        <div class="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
            <div class="flex items-center space-x-4">
                <span class="text-lg font-bold w-20">Lv.${range}</span>
                <div class="w-64 bg-gray-600 rounded-full h-5">
                    <div class="chart-bar h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full" 
                         style="width: ${deathData.death_rate}%"></div>
                </div>
            </div>
            <div class="text-right">
                <span class="text-xl font-bold text-red-400">${deathData.death_rate}%</span>
                <div class="text-xs text-gray-400">${deathData.deaths}명 사망</div>
            </div>
        </div>
    `,
    
    // 간단한 순위 아이템 생성
    createSimpleRankItem: (index, label, value, valueColor = "text-yellow-400") => `
        <div class="flex items-center justify-between p-2 bg-gray-700 rounded">
            <div class="flex items-center space-x-3">
                <span class="text-lg font-bold w-8">${index + 1}.</span>
                <span class="text-lg">${label}</span>
            </div>
            <span class="text-xl font-bold ${valueColor}">${value}</span>
        </div>
    `
};

// 데이터 처리 유틸리티
const DataUtils = {
    // 객체를 배열로 변환하고 정렬
    sortObjectEntries: (obj, sortBy = 'value', order = 'desc') => {
        return Object.entries(obj).sort((a, b) => {
            const aVal = typeof a[1] === 'object' ? a[1][sortBy] : a[1];
            const bVal = typeof b[1] === 'object' ? b[1][sortBy] : b[1];
            return order === 'desc' ? bVal - aVal : aVal - bVal;
        });
    },
    
    // 최대값 계산
    getMaxValue: (data) => Math.max(...Object.values(data)),
    
    // 퍼센트 계산
    calculatePercentage: (value, max) => (value / max * 100),
    
    // 숫자 포맷팅
    formatNumber: (num) => num.toLocaleString(),
    
    // 슬라이스 유틸리티
    getTopItems: (arr, count) => arr.slice(0, count)
};

// 렌더링 함수들
const Renderers = {
    // 전체 통계 렌더링
    renderOverallStats: () => {
        const container = document.getElementById('overall-stats');
        const data = statsData.league_analysis.part1_overall_league_status;
        
        const stats = [
            {
                value: DataUtils.formatNumber(data['1_total_participants'].value),
                title: "총 참가자",
                unit: data['1_total_participants'].unit,
                color: "bg-blue-800"
            },
            {
                value: DataUtils.formatNumber(data['2_total_characters_created'].value),
                title: "생성된 캐릭터",
                unit: data['2_total_characters_created'].unit,
                color: "bg-green-800"
            },
            {
                value: data['3_average_characters_per_account'].value,
                title: "계정당 평균 캐릭터 수",
                unit: data['3_average_characters_per_account'].unit,
                color: "bg-purple-800"
            },
            {
                value: DataUtils.formatNumber(
                    statsData.league_analysis.part2_team_battle_analysis['8_team_distribution'].data['자나팀'] + 
                    statsData.league_analysis.part2_team_battle_analysis['8_team_distribution'].data['알바팀']
                ),
                title: "자나, 알바 정확히 포함된 캐릭터 수",
                unit: "자나팀 vs 알바팀",
                color: "bg-red-800"
            }
        ];

        container.innerHTML = stats.map(stat => DOMHelpers.createStatCard(stat.value, stat.title, stat.unit, stat.color)).join('');
    },
    
    // 팀별 대결 통계 렌더링
    renderTeamBattle: () => {
        const container = document.getElementById('team-battle');
        const teamData = statsData.league_analysis.part2_team_battle_analysis;
        
        const teams = [
            {
                name: "🔥 자나팀",
                color: "bg-blue-800",
                data: {
                    characters: teamData['8_team_distribution'].data['자나팀'],
                    avgLevel: teamData['9_team_average_level'].data['자나팀'],
                    survival: teamData['10_team_survival_rate'].data['자나팀'],
                    top200: teamData['11_team_top200_rankers'].data['자나팀'],
                    totalExp: teamData['13_team_total_experience'].data['자나팀'],
                    above60: teamData['14_team_characters_above_level'].data['자나팀'].above_60,
                    above70: teamData['14_team_characters_above_level'].data['자나팀'].above_70,
                    above80: teamData['14_team_characters_above_level'].data['자나팀'].above_80,
                    above90: teamData['14_team_characters_above_level'].data['자나팀'].above_90
                }
            },
            {
                name: "⚡ 알바팀",
                color: "bg-red-800",
                data: {
                    characters: teamData['8_team_distribution'].data['알바팀'],
                    avgLevel: teamData['9_team_average_level'].data['알바팀'],
                    survival: teamData['10_team_survival_rate'].data['알바팀'],
                    top200: teamData['11_team_top200_rankers'].data['알바팀'],
                    totalExp: teamData['13_team_total_experience'].data['알바팀'],
                    above60: teamData['14_team_characters_above_level'].data['알바팀'].above_60,
                    above70: teamData['14_team_characters_above_level'].data['알바팀'].above_70,
                    above80: teamData['14_team_characters_above_level'].data['알바팀'].above_80,
                    above90: teamData['14_team_characters_above_level'].data['알바팀'].above_90
                }
            }
        ];

        container.innerHTML = teams.map(DOMHelpers.createTeamCard).join('');
    },
    
    // 팀별 TOP 20 랭커 렌더링
    renderTeamRankers: () => {
        const janaContainer = document.getElementById('jana-top20');
        const albaContainer = document.getElementById('alba-top20');
        const teamRankers = statsData.league_analysis.part2_team_battle_analysis['15_team_top20_rankers'].data;
        
        janaContainer.innerHTML = teamRankers['자나팀']
            .map(player => DOMHelpers.createRankItem(player.rank, player.character, player.account))
            .join('');
            
        albaContainer.innerHTML = teamRankers['알바팀']
            .map(player => DOMHelpers.createRankItem(player.rank, player.character, player.account))
            .join('');
    },
    
    // 팀별 클래스 선호도 렌더링
    renderTeamClassPreference: () => {
        const janaContainer = document.getElementById('jana-class-preference');
        const albaContainer = document.getElementById('alba-class-preference');
        const classPreference = statsData.league_analysis.part2_team_battle_analysis['12_team_class_preference_top5'].data;
        
        janaContainer.innerHTML = classPreference['자나팀']
            .map((classData, index) => DOMHelpers.createClassPreferenceItem(index, classData.class, classData.count))
            .join('');
            
        albaContainer.innerHTML = classPreference['알바팀']
            .map((classData, index) => DOMHelpers.createClassPreferenceItem(index, classData.class, classData.count))
            .join('');
    },
    
    // 클래스 분포 렌더링
    renderClassDistribution: () => {
        const container = document.getElementById('class-distribution');
        const data = statsData.league_analysis.part1_overall_league_status['4_class_distribution'].data;
        const sortedClasses = DataUtils.sortObjectEntries(data, 'percentage');
        
        container.innerHTML = sortedClasses.map(([className, classData]) => `
            <div class="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div class="flex items-center space-x-4">
                    <span class="text-xl font-bold w-32">${className}</span>
                    <div class="w-96 bg-gray-600 rounded-full h-6 relative overflow-hidden">
                        <div class="chart-bar h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" 
                             style="width: ${classData.percentage}%"></div>
                    </div>
                </div>
                <div class="flex items-center space-x-4 text-right">
                    <span class="text-lg font-bold text-yellow-300">${DataUtils.formatNumber(classData.characters)}개</span>
                    <span class="text-lg font-bold text-green-400 w-16">${classData.percentage}%</span>
                </div>
            </div>
        `).join('');
    },
    
    // 클래스별 사망 분석 렌더링
    renderDeathAnalysis: () => {
        const container = document.getElementById('death-analysis');
        const data = statsData.league_analysis.part1_overall_league_status['5_death_analysis'].average_death_level_by_class.data;
        const sortedClasses = DataUtils.getTopItems(DataUtils.sortObjectEntries(data), 15);
        
        container.innerHTML = sortedClasses
            .map(([className, avgDeathLevel], index) => 
                DOMHelpers.createSimpleRankItem(index, className, `Lv.${avgDeathLevel}`, "text-red-400"))
            .join('');
    },
    
    // 레벨 분포 렌더링
    renderLevelDistribution: () => {
        const container = document.getElementById('level-distribution');
        const data = statsData.league_analysis.part1_overall_league_status['6_level_range_distribution'].data;
        const maxValue = DataUtils.getMaxValue(data);
        
        container.innerHTML = Object.entries(data)
            .map(([range, count]) => {
                const percentage = DataUtils.calculatePercentage(count, maxValue);
                return DOMHelpers.createProgressBarItem(
                    `Lv.${range}`, 
                    percentage, 
                    `${DataUtils.formatNumber(count)}개`,
                    "bg-gradient-to-r from-green-500 to-blue-500",
                    "w-20"
                );
            })
            .join('');
    },
    
    // 사망률 렌더링
    renderDeathRate: () => {
        const container = document.getElementById('death-rate');
        const data = statsData.league_analysis.part1_overall_league_status['7_death_rate_by_level_range'].data;
        
        container.innerHTML = Object.entries(data)
            .map(([range, deathData]) => DOMHelpers.createDeathRateItem(range, deathData))
            .join('');
    },
    
    // 클래스 성능 분석 렌더링
    renderClassAnalysis: () => {
        const survivalContainer = document.getElementById('survival-rate');
        const levelContainer = document.getElementById('average-level');
        
        const survivalData = statsData.league_analysis.part3_detailed_analysis['16_class_survival_rate'].data;
        const levelData = statsData.league_analysis.part3_detailed_analysis['17_class_average_level'].data;
        
        const topSurvival = DataUtils.getTopItems(DataUtils.sortObjectEntries(survivalData), 15);
        const topLevel = DataUtils.getTopItems(DataUtils.sortObjectEntries(levelData), 15);
        
        survivalContainer.innerHTML = topSurvival
            .map(([className, rate], index) => 
                DOMHelpers.createSimpleRankItem(index, className, `${rate}%`, "text-green-400"))
            .join('');
            
        levelContainer.innerHTML = topLevel
            .map(([className, level], index) => 
                DOMHelpers.createSimpleRankItem(index, className, `Lv.${level}`, "text-blue-400"))
            .join('');
    },
    
    // 랭킹별 생존율 렌더링
    renderRankingSurvival: () => {
        const container = document.getElementById('ranking-survival');
        const data = statsData.league_analysis.part3_detailed_analysis['18_survival_rate_by_ranking'].data;
        const maxRate = DataUtils.getMaxValue(data);
        
        container.innerHTML = Object.entries(data)
            .map(([range, rate]) => {
                const percentage = DataUtils.calculatePercentage(rate, maxRate);
                return DOMHelpers.createProgressBarItem(
                    `${range}위`,
                    percentage,
                    `${rate}%`,
                    "bg-gradient-to-r from-cyan-500 to-blue-500",
                    "w-24"
                );
            })
            .join('');
    },
    
    // 명예의 전당 렌더링
    renderHallOfFame: () => {
        const tragicContainer = document.getElementById('tragic-deaths');
        const totalLevelContainer = document.getElementById('total-level-ranking');
        
        const tragicData = statsData.league_analysis.part1_overall_league_status['5_death_analysis'].most_tragic_deaths_top10.data;
        const totalLevelData = statsData.league_analysis.part3_detailed_analysis['19_account_total_level_top30'].data;
        
        // 최고 레벨 사망자
        tragicContainer.innerHTML = tragicData.map((player, index) => `
            <div class="flex items-center justify-between p-2 bg-gray-700 rounded">
                <div class="flex items-center space-x-2">
                    <span class="text-lg font-bold w-8">${index + 1}.</span>
                    <div>
                        <div class="text-sm font-bold">${player.character}</div>
                        <div class="text-xs opacity-75">${player.account}</div>
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-lg font-bold text-red-400">Lv.${player.level}</div>
                    <div class="text-xs text-gray-400">${player.class}</div>
                </div>
            </div>
        `).join('');
        
        // 총 레벨 합계 TOP 10
        totalLevelContainer.innerHTML = DataUtils.getTopItems(totalLevelData, 10)
            .map((account, index) => {
                const isExpanded = index < 3;
                return `
                    <div class="bg-gray-700 rounded p-2 mb-2">
                        <div class="flex items-center justify-between expandable" onclick="toggleCharacterList('chars-${index}')">
                            <div class="flex items-center space-x-2">
                                <span class="text-lg font-bold w-8">${index + 1}.</span>
                                <div class="text-sm font-bold">${account.account}</div>
                            </div>
                            <div class="flex items-center space-x-2">
                                <span class="text-xl font-bold text-yellow-400">Lv.${account.total_level}</span>
                                <span class="text-lg">👁️</span>
                            </div>
                        </div>
                        <div id="chars-${index}" class="character-list mt-2 text-xs ${isExpanded ? '' : 'hidden'}">
                            <div class="bg-gray-600 p-2 rounded text-gray-300">
                                <div class="font-bold mb-1">캐릭터 목록:</div>
                                <div class="whitespace-pre-wrap">${account.characters}</div>
                            </div>
                        </div>
                    </div>
                `;
            })
            .join('');
    },
    
    // 최다 사망자 렌더링
    renderDeathCountRanking: () => {
        const container = document.getElementById('death-count-ranking');
        const data = statsData.league_analysis.part3_detailed_analysis['20_account_death_count_top10'].data;
        
        container.innerHTML = data.map((account, index) => `
            <div class="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div class="flex items-center space-x-3">
                    <span class="text-lg font-bold w-8">${index + 1}.</span>
                    <div class="text-lg font-bold">${account.account}</div>
                </div>
                <span class="text-2xl font-bold text-red-400">💀 ${account.death_count}회</span>
            </div>
        `).join('');
    },
    
    // 통계 설명 렌더링
    renderStatisticsExplanation: () => {
        const container = document.getElementById('statistics-explanation');
        const explanations = [
            {
                title: "총 참가자 수",
                description: statsData.league_analysis.part1_overall_league_status['1_total_participants'].description,
                calculation: statsData.league_analysis.part1_overall_league_status['1_total_participants'].calculation
            },
            {
                title: "평균 캐릭터 수",
                description: statsData.league_analysis.part1_overall_league_status['3_average_characters_per_account'].description,
                calculation: statsData.league_analysis.part1_overall_league_status['3_average_characters_per_account'].calculation
            },
            {
                title: "클래스 분포",
                description: statsData.league_analysis.part1_overall_league_status['4_class_distribution'].description,
                calculation: statsData.league_analysis.part1_overall_league_status['4_class_distribution'].calculation
            },
            {
                title: "팀별 생존율",
                description: statsData.league_analysis.part2_team_battle_analysis['10_team_survival_rate'].description,
                calculation: statsData.league_analysis.part2_team_battle_analysis['10_team_survival_rate'].calculation
            },
            {
                title: "클래스별 생존율",
                description: statsData.league_analysis.part3_detailed_analysis['16_class_survival_rate'].description,
                calculation: statsData.league_analysis.part3_detailed_analysis['16_class_survival_rate'].calculation
            },
            {
                title: "랭킹별 생존율",
                description: statsData.league_analysis.part3_detailed_analysis['18_survival_rate_by_ranking'].description,
                calculation: statsData.league_analysis.part3_detailed_analysis['18_survival_rate_by_ranking'].calculation
            },
            {
                title: "레벨 구간 분포",
                description: statsData.league_analysis.part1_overall_league_status['6_level_range_distribution'].description,
                calculation: statsData.league_analysis.part1_overall_league_status['6_level_range_distribution'].calculation
            },
            {
                title: "사망률",
                description: statsData.league_analysis.part1_overall_league_status['7_death_rate_by_level_range'].description,
                calculation: statsData.league_analysis.part1_overall_league_status['7_death_rate_by_level_range'].calculation
            }
        ];
        
        container.innerHTML = explanations.map(item => `
            <div class="bg-gray-700 rounded-lg p-4">
                <h4 class="text-xl font-bold mb-2 text-yellow-400">${item.title}</h4>
                <p class="text-sm mb-2 opacity-90">${item.description}</p>
                <div class="text-xs opacity-75 bg-gray-600 p-2 rounded">
                    <strong>계산 방식:</strong> ${item.calculation}
                </div>
            </div>
        `).join('');
    }
};

// 캐릭터 목록 토글 함수
function toggleCharacterList(id) {
    const element = document.getElementById(id);
    element.classList.toggle('hidden');
}

// 페이지 로드 시 모든 통계 표시
document.addEventListener('DOMContentLoaded', function() {
    // 모든 렌더링 함수 실행
    Object.values(Renderers).forEach(renderer => renderer());
});