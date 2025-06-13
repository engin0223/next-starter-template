/*
 * ----------------------------------------------------------------------
 * FILE: src/app/page.tsx
 *
 * INSTRUCTIONS:
 * Replace the entire content of your existing 'src/app/page.tsx'
 * file with the code below. This is the main React component for the
 * calculator application.
 * ----------------------------------------------------------------------
 */
"use client";

import { useState } from 'react';

// --- Type Definitions for State ---
type Inputs = {
    allGradesText: string;
    yourHBN: string;
    yourFinal: string;
    faculty: string;
};

type Result = {
    finalGrade: string;
    reason: string;
    stats: {
        eligibleCount: number;
        mean: number;
        stdDev: number;
        tScore?: number;
    } | null;
    error: string | null;
};

// --- Helper Components for UI ---
const ResultCard = ({ style, title, children }: { style: string, title: string, children: React.ReactNode }) => (
    <div className={`border-l-4 p-4 rounded-md ${style}`}>
        <h3 className="font-bold">{title}</h3>
        <div className="mt-1 text-sm">{children}</div>
    </div>
);

const GradeColors: { [key: string]: string } = {
    'AA': 'bg-green-50 border-green-500 text-green-800', 'BA': 'bg-green-50 border-green-500 text-green-800',
    'BB': 'bg-blue-50 border-blue-500 text-blue-800', 'CB': 'bg-blue-50 border-blue-500 text-blue-800',
    'CC': 'bg-teal-50 border-teal-500 text-teal-800',
    'DC': 'bg-yellow-50 border-yellow-500 text-yellow-800',
    'DD': 'bg-orange-50 border-orange-500 text-orange-800',
    'FD': 'bg-red-50 border-red-500 text-red-800', 'FF': 'bg-red-50 border-red-500 text-red-800',
    'INFO': 'bg-indigo-50 border-indigo-400 text-indigo-800',
    'STATS': 'bg-gray-50 border-gray-400 text-gray-800',
    'WARN': 'bg-yellow-50 border-yellow-400 text-yellow-800',
};


// --- Main Application Component ---
export default function GradeCalculatorPage() {
    const [inputs, setInputs] = useState<Inputs>({
        allGradesText: '',
        yourHBN: '',
        yourFinal: '',
        faculty: '45',
    });
    const [result, setResult] = useState<Result | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setInputs(prev => ({ ...prev, [id]: value }));
    };
    
    const calculateGrade = () => {
        // --- Calculation Logic ---
        const getMean = (data: number[]) => data.reduce((acc, val) => acc + val, 0) / data.length;
        const getStdDev = (data: number[]) => {
            if (data.length < 2) return 0;
            const mean = getMean(data);
            const sqDiff = data.map(n => Math.pow(n - mean, 2));
            return Math.sqrt(getMean(sqDiff));
        };
        const getGradeFromMutlak = (hbn: number) => {
            if (hbn >= 90) return 'AA'; if (hbn >= 80) return 'BA'; if (hbn >= 75) return 'BB';
            if (hbn >= 70) return 'CB'; if (hbn >= 60) return 'CC'; if (hbn >= 50) return 'DC';
            if (hbn >= 40) return 'DD'; if (hbn >= 30) return 'FD'; return 'FF';
        };
        const getGradeFromTScore = (tScore: number, mean: number) => {
             if (mean < 42.5) {
                if (tScore >= 71) return 'AA'; if (tScore >= 66) return 'BA'; if (tScore >= 61) return 'BB'; if (tScore >= 56) return 'CB';
                if (tScore >= 51) return 'CC'; if (tScore >= 46) return 'DC'; if (tScore >= 41) return 'DD'; if (tScore >= 36) return 'FD'; return 'FF';
            } else if (mean < 47.5) {
                if (tScore >= 69) return 'AA'; if (tScore >= 64) return 'BA'; if (tScore >= 59) return 'BB'; if (tScore >= 54) return 'CB';
                if (tScore >= 49) return 'CC'; if (tScore >= 44) return 'DC'; if (tScore >= 39) return 'DD'; if (tScore >= 34) return 'FD'; return 'FF';
            } else if (mean < 52.5) {
                if (tScore >= 67) return 'AA'; if (tScore >= 62) return 'BA'; if (tScore >= 57) return 'BB'; if (tScore >= 52) return 'CB';
                if (tScore >= 47) return 'CC'; if (tScore >= 42) return 'DC'; if (tScore >= 37) return 'DD'; if (tScore >= 32) return 'FD'; return 'FF';
            } else if (mean < 57.5) {
                if (tScore >= 65) return 'AA'; if (tScore >= 60) return 'BA'; if (tScore >= 55) return 'BB'; if (tScore >= 50) return 'CB';
                if (tScore >= 45) return 'CC'; if (tScore >= 40) return 'DC'; if (tScore >= 35) return 'DD'; if (tScore >= 30) return 'FD'; return 'FF';
            } else if (mean < 62.5) {
                if (tScore >= 63) return 'AA'; if (tScore >= 58) return 'BA'; if (tScore >= 53) return 'BB'; if (tScore >= 48) return 'CB';
                if (tScore >= 43) return 'CC'; if (tScore >= 38) return 'DC'; if (tScore >= 33) return 'DD'; if (tScore >= 28) return 'FD'; return 'FF';
            } else if (mean < 70) {
                if (tScore >= 61) return 'AA'; if (tScore >= 56) return 'BA'; if (tScore >= 51) return 'BB'; if (tScore >= 46) return 'CB';
                if (tScore >= 41) return 'CC'; if (tScore >= 36) return 'DC'; if (tScore >= 31) return 'DD'; if (tScore >= 26) return 'FD'; return 'FF';
            } else { // mean >= 70
                if (tScore >= 59) return 'AA'; if (tScore >= 54) return 'BA'; if (tScore >= 49) return 'BB'; if (tScore >= 44) return 'CB';
                if (tScore >= 39) return 'CC'; if (tScore >= 34) return 'DC'; if (tScore >= 29) return 'DD'; if (tScore >= 24) return 'FD'; return 'FF';
            }
        };
        const getGradeFromPercentage = (hbn: number, allGrades: number[], mean: number) => {
             const percentages: {[key: string]: number} = {};
             if (mean < 42.5) {
                percentages.AA = 3; percentages.BA = 6; percentages.BB = 9; percentages.CB = 14.4; percentages.CC = 21.6; percentages.DC = 19.2; percentages.DD = 12.8; percentages.FD = 7; percentages.FF = 7;
            } else if (mean < 47.5) {
                percentages.AA = 4; percentages.BA = 8; percentages.BB = 12; percentages.CB = 14.8; percentages.CC = 22.2; percentages.DC = 17.4; percentages.DD = 11.6; percentages.FD = 5; percentages.FF = 5;
            } else if (mean < 52.5) {
                percentages.AA = 7; percentages.BA = 9.6; percentages.BB = 14.4; percentages.CB = 15.2; percentages.CC = 22.8; percentages.DC = 14.4; percentages.DD = 9.6; percentages.FD = 3.5; percentages.FF = 3.5;
            } else if (mean < 57.5) {
                percentages.AA = 10; percentages.BA = 11.6; percentages.BB = 17.4; percentages.CB = 14.8; percentages.CC = 22.2; percentages.DC = 12; percentages.DD = 8; percentages.FD = 2; percentages.FF = 2;
            } else if (mean < 62.5) {
                percentages.AA = 14; percentages.BA = 12.8; percentages.BB = 19.2; percentages.CB = 14.4; percentages.CC = 21.6; percentages.DC = 9; percentages.DD = 6; percentages.FD = 1.5; percentages.FF = 1.5;
            } else if (mean < 70) {
                percentages.AA = 18; percentages.BA = 14.4; percentages.BB = 21.6; percentages.CB = 12.8; percentages.CC = 19.2; percentages.DC = 7.2; percentages.DD = 4.8; percentages.FD = 1; percentages.FF = 1;
            } else { // mean >= 70
                percentages.AA = 24; percentages.BA = 15.2; percentages.BB = 22.8; percentages.CB = 11.6; percentages.CC = 17.4; percentages.DC = 4.8; percentages.DD = 3.2; percentages.FD = 0.5; percentages.FF = 0.5;
            }
            const sortedGrades = [...allGrades].sort((a, b) => b - a);
            const studentRank = sortedGrades.indexOf(hbn) + 1;
            let cumulativePercentage = 0;
            for (const grade of ['AA', 'BA', 'BB', 'CB', 'CC', 'DC', 'DD', 'FD', 'FF']) {
                cumulativePercentage += percentages[grade];
                if ((studentRank / allGrades.length * 100) <= cumulativePercentage) return grade;
            }
            return 'FF';
        };

        // --- Start Main Logic ---
        const { allGradesText, yourHBN: yourHBNStr, yourFinal: yourFinalStr, faculty } = inputs;
        const yourHBN = parseFloat(yourHBNStr);
        const yourFinal = parseFloat(yourFinalStr);
        const finalMin = parseInt(faculty);

        if (!allGradesText || isNaN(yourHBN) || isNaN(yourFinal)) {
            setResult({ finalGrade: '', reason: '', stats: null, error: 'Lütfen tüm not alanlarını eksiksiz doldurun.' });
            return;
        }

        const allGrades = allGradesText.split(/\s+/).map(Number).filter(n => !isNaN(n));
        if (!allGrades.includes(yourHBN)) {
            setResult({ finalGrade: '', reason: '', stats: null, error: 'Kendi notunuz, girilen tüm notlar listesinde bulunmalıdır.' });
            return;
        }

        let reasonParts: string[] = [];
        let finalGrade: string;

        if (yourFinal < finalMin) {
            finalGrade = 'FF';
            reasonParts.push(`Final notunuz (${yourFinal}), fakülteniz için belirlenen minimum sınır olan ${finalMin}'den düşük olduğu için notunuz doğrudan FF olarak belirlenmiştir.`);
            setResult({ finalGrade, reason: reasonParts.join('<br>'), stats: null, error: null });
            return;
        }
        
        const eligibleStudents = allGrades.filter(hbn => hbn > 15);
        const n = eligibleStudents.length;
        const classMean = n > 0 ? getMean(eligibleStudents) : 0;
        const classStdDev = n > 0 ? getStdDev(eligibleStudents) : 0;
        
        let isMutlak = false;
        if (n <= 10) {
            isMutlak = true;
            reasonParts.push(`Değerlendirmeye katılan öğrenci sayısı (${n}) 10 veya daha az olduğu için <strong>Mutlak Değerlendirme Sistemi (Tablo-3)</strong> kullanılmıştır.`);
        } else if (classMean >= 80) {
            isMutlak = true;
            reasonParts.push(`Sınıfın ham başarı notu ortalaması (${classMean.toFixed(2)}) 80'den yüksek olduğu için <strong>Mutlak Değerlendirme Sistemi (Tablo-3)</strong> kullanılmıştır.`);
        }

        let rawCalculatedGrade: string;
        let tScore: number | undefined;

        if (isMutlak) {
            rawCalculatedGrade = getGradeFromMutlak(yourHBN);
        } else {
            if (yourHBN <= 15) {
                rawCalculatedGrade = 'FF';
                reasonParts.push(`Ham başarı notunuz (${yourHBN}) 15'ten düşük olduğu için bağıl değerlendirmeye katılmadınız ve notunuz FF'dir.`);
            } else if (n > 29) {
                tScore = classStdDev > 0 ? ((yourHBN - classMean) / classStdDev) * 10 + 50 : 50;
                rawCalculatedGrade = getGradeFromTScore(tScore, classMean);
                reasonParts.push(`Değerlendirmeye katılan öğrenci sayısı (${n}) 29'dan fazla olduğu için <strong>T-Skoru Sistemi (Tablo-1)</strong> kullanılmıştır.`);
                reasonParts.push(`Hesaplanan T-Skorunuz: <strong>${tScore.toFixed(2)}</strong>`);
            } else {
                rawCalculatedGrade = getGradeFromPercentage(yourHBN, eligibleStudents, classMean);
                reasonParts.push(`Değerlendirmeye katılan öğrenci sayısı (${n}) 11-29 arasında olduğu için <strong>Yüzdelik Dilim Sistemi (Tablo-2)</strong> kullanılmıştır.`);
            }
        }
        
        const mutlakEquivalentGrade = getGradeFromMutlak(yourHBN);
        const gradeValues = { 'AA': 9, 'BA': 8, 'BB': 7, 'CB': 6, 'CC': 5, 'DC': 4, 'DD': 3, 'FD': 2, 'FF': 1 };
        if (gradeValues[rawCalculatedGrade] < gradeValues[mutlakEquivalentGrade]) {
            finalGrade = mutlakEquivalentGrade;
            reasonParts.push(`Hesaplanan notunuz (${rawCalculatedGrade}), mutlak sistemdeki karşılığı olan <strong>${mutlakEquivalentGrade}</strong>'den düşük olamaz. Bu nedenle notunuz <strong>${mutlakEquivalentGrade}</strong> olarak belirlenmiştir (Yönetmelik Madde 9, Ek 6).`);
        } else {
            finalGrade = rawCalculatedGrade;
        }

        setResult({
            finalGrade,
            reason: reasonParts.join('<br>'),
            stats: { eligibleCount: n, mean: classMean, stdDev: classStdDev, tScore },
            error: null,
        });
    };

    return (
        <div className="max-w-4xl w-full">
            <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">KTÜ Harf Notu Hesaplayıcı</h1>
                    <p className="text-gray-600 mt-2">Ders notlarınızı girerek harf notunuzu KTÜ yönetmeliğine göre hesaplayın.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Input Column */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Not Bilgileri</h2>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="allGradesText" className="block text-sm font-medium text-gray-700 mb-1">Sınıftaki Tüm Ham Başarı Notları (HBN)</label>
                                <textarea id="allGradesText" value={inputs.allGradesText} onChange={handleInputChange} rows={8} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Her satıra bir not gelecek şekilde tüm notları girin.&#10;78&#10;56&#10;92&#10;..."></textarea>
                            </div>
                            <div>
                                <label htmlFor="yourHBN" className="block text-sm font-medium text-gray-700 mb-1">Kendi Ham Başarı Notunuz (HBN)</label>
                                <input type="number" id="yourHBN" value={inputs.yourHBN} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Örn: 85" />
                            </div>
                            <div>
                                <label htmlFor="yourFinal" className="block text-sm font-medium text-gray-700 mb-1">Final/Bütünleme Sınav Notunuz</label>
                                <input type="number" id="yourFinal" value={inputs.yourFinal} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Örn: 90" />
                            </div>
                             <div>
                                <label htmlFor="faculty" className="block text-sm font-medium text-gray-700 mb-1">Fakülte (Final Alt Sınırı İçin)</label>
                                <select id="faculty" value={inputs.faculty} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                                    <option value="45">Diğer Fakülteler (Final Alt Sınırı: 45)</option>
                                    <option value="50">Sağlık Bilimleri Fakültesi (Final Alt Sınırı: 50)</option>
                                    <option value="60">Eczacılık Fakültesi (Final Alt Sınırı: 60)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Result Column */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Sonuç</h2>
                        <div className="space-y-4">
                            {!result && <ResultCard style={GradeColors.STATS} title="Bekleniyor..."><p>Hesaplama yapmak için lütfen gerekli alanları doldurun.</p></ResultCard>}
                            {result?.error && <ResultCard style={GradeColors.WARN} title="Uyarı"><p>{result.error}</p></ResultCard>}
                            {result?.finalGrade && (
                                <>
                                    <ResultCard style={GradeColors[result.finalGrade] || GradeColors.STATS} title="Hesaplanan Harf Notunuz">
                                        <span className="text-3xl font-extrabold">{result.finalGrade}</span>
                                    </ResultCard>

                                    {result.stats && (
                                    <ResultCard style={GradeColors.STATS} title="İstatistikler">
                                        <ul className="space-y-1 list-disc list-inside">
                                            <li>Değerlendirmeye Katılan Öğrenci: <strong>{result.stats.eligibleCount}</strong></li>
                                            <li>Sınıf HBN Ortalaması: <strong>{result.stats.mean.toFixed(2)}</strong></li>
                                            <li>Sınıf HBN Std. Sapması: <strong>{result.stats.stdDev.toFixed(2)}</strong></li>
                                            {result.stats.tScore && <li>T-Skorunuz: <strong>{result.stats.tScore.toFixed(2)}</strong></li>}
                                        </ul>
                                    </ResultCard>
                                    )}

                                    <ResultCard style={GradeColors.INFO} title="Değerlendirme Yöntemi">
                                        <div dangerouslySetInnerHTML={{ __html: result.reason }} />
                                    </ResultCard>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button onClick={calculateGrade} className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105">
                        Hesapla
                    </button>
                </div>
            </div>
             <footer className="text-center mt-6 text-sm text-gray-500">
                <p>
                    Bu hesaplayıcı, KTÜ yönetmeliklerine göre hazırlanmıştır. Resmi notlandırma için öğrenci otomasyonu sonuçları esastır.
                </p>
            </footer>
        </div>
    );
}
