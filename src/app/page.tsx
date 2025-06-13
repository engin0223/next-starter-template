/*
 * ----------------------------------------------------------------------
 * FILE: src/app/page.tsx (Advanced Statistics Version)
 *
 * INSTRUCTIONS:
 * This version uses separate statistics for midterm and final exams,
 * along with a correlation coefficient 'p', to calculate the final
 * HBN statistics. The midterm/final weight is fixed at 50%.
 * ----------------------------------------------------------------------
 */
"use client";

import { useState } from 'react';

// --- Type Definitions for State and Logic ---
type LetterGrade = 'AA' | 'BA' | 'BB' | 'CB' | 'CC' | 'DC' | 'DD' | 'FD' | 'FF';

type Inputs = {
    studentCount: string;
    midtermMean: string;
    midtermStdDev: string;
    finalMean: string;
    finalStdDev: string;
    yourMidterm: string;
    yourFinal: string;
    correlation: string; // 'p' value from -1 to 1
    faculty: string;
};

type Result = {
    finalGrade: string;
    reason: string;
    stats: {
        hbnMean: number;
        hbnStdDev: number;
        yourHBN: number;
        tScore?: number;
    } | null;
    error: string | null;
    warning: string | null;
};

// --- Helper UI Components ---
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
        studentCount: '40',
        midtermMean: '50',
        midtermStdDev: '10',
        finalMean: '50',
        finalStdDev: '10',
        yourMidterm: '60',
        yourFinal: '60',
        correlation: '0.5', // Default to a moderate positive correlation
        faculty: '45',
    });
    const [result, setResult] = useState<Result | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setInputs(prev => ({ ...prev, [id]: value }));
    };

    const calculateGrade = () => {
        // --- Calculation Logic Functions ---
        const getGradeFromMutlak = (hbn: number): LetterGrade => {
            if (hbn >= 90) return 'AA'; if (hbn >= 80) return 'BA'; if (hbn >= 75) return 'BB';
            if (hbn >= 70) return 'CB'; if (hbn >= 60) return 'CC'; if (hbn >= 50) return 'DC';
            if (hbn >= 40) return 'DD'; if (hbn >= 30) return 'FD'; return 'FF';
        };
        const getGradeFromTScore = (tScore: number, mean: number): LetterGrade => {
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

        // --- Start Main Logic ---
        const values = {
            n: parseInt(inputs.studentCount),
            midtermMean: parseFloat(inputs.midtermMean),
            midtermStdDev: parseFloat(inputs.midtermStdDev),
            finalMean: parseFloat(inputs.finalMean),
            finalStdDev: parseFloat(inputs.finalStdDev),
            yourMidterm: parseFloat(inputs.yourMidterm),
            yourFinal: parseFloat(inputs.yourFinal),
            correlation_p: parseFloat(inputs.correlation),
            facultyMin: parseInt(inputs.faculty),
        };

        // Remove midtermWeight from here, as it's now fixed
        const { n, midtermMean, midtermStdDev, finalMean, finalStdDev, yourMidterm, yourFinal, correlation_p, facultyMin } = values;

        if (Object.values(values).some(v => isNaN(v))) {
             setResult({ finalGrade: '', reason: '', stats: null, error: 'Lütfen tüm sayısal alanları eksiksiz doldurun.', warning: null });
            return;
        }
        
        // Hardcode weights to 50% each
        const w1 = 0.5; 
        const w2 = 0.5;

        // Calculate HBN stats
        const yourHBN = w1 * yourMidterm + w2 * yourFinal;
        const hbnMean = w1 * midtermMean + w2 * finalMean;
        const covariance = correlation_p * midtermStdDev * finalStdDev;
        const hbnVariance = Math.pow(w1, 2) * Math.pow(midtermStdDev, 2) + Math.pow(w2, 2) * Math.pow(finalStdDev, 2) + 2 * w1 * w2 * covariance;
        const hbnStdDev = hbnVariance > 0 ? Math.sqrt(hbnVariance) : 0;
        
        let reasonParts: string[] = [];
        let finalGrade: string;

        if (yourFinal < facultyMin) {
            finalGrade = 'FF';
            reasonParts.push(`Final notunuz (${yourFinal}), fakülteniz için belirlenen minimum sınır olan ${facultyMin}'den düşük olduğu için notunuz doğrudan FF olarak belirlenmiştir.`);
            setResult({ finalGrade, reason: reasonParts.join('<br>'), stats: { yourHBN, hbnMean, hbnStdDev }, error: null, warning: null });
            return;
        }

        let isMutlak = false;
        if (n <= 10) {
            isMutlak = true;
            reasonParts.push(`Öğrenci sayısı (${n}) 10 veya daha az olduğu için <strong>Mutlak Değerlendirme Sistemi (Tablo-3)</strong> kullanılmıştır.`);
        } else if (hbnMean >= 80) {
            isMutlak = true;
            reasonParts.push(`Hesaplanan HBN ortalaması (${hbnMean.toFixed(2)}) 80'den yüksek olduğu için <strong>Mutlak Değerlendirme Sistemi (Tablo-3)</strong> kullanılmıştır.`);
        }
        
        let rawCalculatedGrade: LetterGrade;
        let tScore: number | undefined;

        if (isMutlak) {
            rawCalculatedGrade = getGradeFromMutlak(yourHBN);
        } else {
             if (n >= 30) {
                tScore = hbnStdDev > 0 ? ((yourHBN - hbnMean) / hbnStdDev) * 10 + 50 : 50;
                rawCalculatedGrade = getGradeFromTScore(tScore, hbnMean);
                reasonParts.push(`Öğrenci sayısı (${n}) 29'dan fazla olduğu için <strong>T-Skoru Sistemi (Tablo-1)</strong> kullanılmıştır.`);
            } else { // Case for 11 <= n <= 29
                setResult({
                    finalGrade: '', reason: '', stats: { yourHBN, hbnMean, hbnStdDev }, error: null,
                    warning: `Öğrenci sayısı 11 ile 29 arasında olduğunda, notunuzu hesaplamak için sınıftaki tüm notların listesi gereklidir. Bu yöntem, notların sıralanıp yüzdelik dilimlere ayrılmasına dayandığı için sadece istatistiklerle hesaplanamaz.`
                });
                return;
            }
        }
        
        const mutlakEquivalentGrade = getGradeFromMutlak(yourHBN);
        const gradeValues: Record<LetterGrade, number> = { 'AA': 9, 'BA': 8, 'BB': 7, 'CB': 6, 'CC': 5, 'DC': 4, 'DD': 3, 'FD': 2, 'FF': 1 };
        
        if (gradeValues[rawCalculatedGrade] < gradeValues[mutlakEquivalentGrade]) {
            finalGrade = mutlakEquivalentGrade;
            reasonParts.push(`Hesaplanan notunuz (${rawCalculatedGrade}), mutlak sistemdeki karşılığı olan <strong>${mutlakEquivalentGrade}</strong>'den düşük olamaz. Bu nedenle notunuz <strong>${mutlakEquivalentGrade}</strong> olarak belirlenmiştir (Yönetmelik Madde 9, Ek 6).`);
        } else {
            finalGrade = rawCalculatedGrade;
        }

        setResult({ finalGrade, reason: reasonParts.join('<br>'), stats: { yourHBN, hbnMean, hbnStdDev, tScore }, error: null, warning: null });
    };
    
    return (
        <div className="max-w-4xl w-full">
            <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">KTÜ Harf Notu Hesaplayıcı (İstatistiksel)</h1>
                    <p className="text-gray-600 mt-2">Vize/Final istatistiklerini girerek harf notunuzu tahmin edin.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {/* --- Left Column: Class Stats & Params --- */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2 border-b pb-2">Ders Parametreleri</h2>
                        <div>
                            <label htmlFor="studentCount" className="block text-sm font-medium text-gray-700">Öğrenci Sayısı</label>
                            <input type="number" id="studentCount" value={inputs.studentCount} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md mt-1" />
                        </div>
                        
                        <h2 className="text-xl font-semibold text-gray-700 mb-2 pt-4 border-b pb-2">Sınıf İstatistikleri</h2>
                         <div>
                            <label htmlFor="midtermMean" className="block text-sm font-medium text-gray-700">Vize Ortalaması</label>
                            <input type="number" id="midtermMean" value={inputs.midtermMean} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md mt-1" />
                        </div>
                        <div>
                            <label htmlFor="midtermStdDev" className="block text-sm font-medium text-gray-700">Vize Standart Sapması</label>
                            <input type="number" id="midtermStdDev" value={inputs.midtermStdDev} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md mt-1" />
                        </div>
                        <div>
                            <label htmlFor="finalMean" className="block text-sm font-medium text-gray-700">Final Ortalaması</label>
                            <input type="number" id="finalMean" value={inputs.finalMean} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md mt-1" />
                        </div>
                        <div>
                            <label htmlFor="finalStdDev" className="block text-sm font-medium text-gray-700">Final Standart Sapması</label>
                            <input type="number" id="finalStdDev" value={inputs.finalStdDev} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md mt-1" />
                        </div>
                        <div>
                             <label htmlFor="correlation" className="block text-sm font-medium text-gray-700">Korelasyon Katsayısı (p)</label>
                             <div className="flex items-center space-x-4 mt-1">
                                <input type="range" id="correlation" min="-1" max="1" step="0.05" value={inputs.correlation} onChange={handleInputChange} className="w-full" />
                                <span className="font-mono text-sm text-gray-700 bg-gray-100 p-2 rounded-md">{parseFloat(inputs.correlation).toFixed(2)}</span>
                             </div>
                        </div>
                    </div>
                     {/* --- Right Column: Your Scores & Results --- */}
                    <div className="space-y-4">
                       <h2 className="text-xl font-semibold text-gray-700 mb-2 border-b pb-2">Kişisel Notlarınız</h2>
                        <div>
                            <label htmlFor="yourMidterm" className="block text-sm font-medium text-gray-700">Vize Notunuz</label>
                            <input type="number" id="yourMidterm" value={inputs.yourMidterm} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md mt-1" />
                        </div>
                        <div>
                            <label htmlFor="yourFinal" className="block text-sm font-medium text-gray-700">Final Notunuz</label>
                            <input type="number" id="yourFinal" value={inputs.yourFinal} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md mt-1" />
                        </div>
                        <div>
                            <label htmlFor="faculty" className="block text-sm font-medium text-gray-700">Fakülte (Final Alt Sınırı)</label>
                            <select id="faculty" value={inputs.faculty} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md bg-white mt-1">
                                <option value="45">Diğer (45)</option>
                                <option value="50">Sağlık Bilimleri (50)</option>
                                <option value="60">Eczacılık (60)</option>
                            </select>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-700 pt-4 border-b pb-2">Sonuç</h2>
                         <div className="space-y-4 pt-2">
                            {!result && <ResultCard style={GradeColors.STATS} title="Bekleniyor..."><p>Hesaplama yapmak için alanları doldurun ve butona tıklayın.</p></ResultCard>}
                            {result?.error && <ResultCard style={GradeColors.WARN} title="Hata"><p>{result.error}</p></ResultCard>}
                            {result?.warning && <ResultCard style={GradeColors.WARN} title="Bilgilendirme"><p>{result.warning}</p></ResultCard>}
                            {result?.finalGrade && (
                                <>
                                    <ResultCard style={GradeColors[result.finalGrade] || GradeColors.STATS} title="Hesaplanan Harf Notunuz">
                                        <span className="text-3xl font-extrabold">{result.finalGrade}</span>
                                    </ResultCard>

                                    {result.stats && (
                                    <ResultCard style={GradeColors.STATS} title="Hesaplanan İstatistikler">
                                        <ul className="space-y-1 text-sm list-disc list-inside">
                                            <li>Senin HBN: <strong>{result.stats.yourHBN.toFixed(2)}</strong></li>
                                            <li>Sınıf HBN Ortalaması: <strong>{result.stats.hbnMean.toFixed(2)}</strong></li>
                                            <li>Sınıf HBN Std. Sapması: <strong>{result.stats.hbnStdDev.toFixed(2)}</strong></li>
                                            {result.stats.tScore && <li>T-Skorun: <strong>{result.stats.tScore.toFixed(2)}</strong></li>}
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
