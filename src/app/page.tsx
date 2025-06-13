/*
 * ----------------------------------------------------------------------
 * FILE: src/app/page.tsx (Statistics Input Version)
 *
 * INSTRUCTIONS:
 * This version uses class statistics (mean, std. deviation) instead
 * of a list of all grades. Replace the content of your 'src/app/page.tsx'
 * file with the code below.
 * ----------------------------------------------------------------------
 */
"use client";

import { useState } from 'react';

// --- Type Definitions for State and Logic ---
type LetterGrade = 'AA' | 'BA' | 'BB' | 'CB' | 'CC' | 'DC' | 'DD' | 'FD' | 'FF';

type Inputs = {
    studentCount: string;
    classMean: string;
    classStdDev: string;
    yourHBN: string;
    yourFinal: string;
    faculty: string;
};

type Result = {
    finalGrade: string;
    reason: string;
    stats: {
        tScore?: number;
    } | null;
    error: string | null;
    warning: string | null;
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
        studentCount: '',
        classMean: '',
        classStdDev: '',
        yourHBN: '',
        yourFinal: '',
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
        const { studentCount: studentCountStr, classMean: classMeanStr, classStdDev: classStdDevStr, yourHBN: yourHBNStr, yourFinal: yourFinalStr, faculty } = inputs;
        const n = parseInt(studentCountStr);
        const classMean = parseFloat(classMeanStr);
        const classStdDev = parseFloat(classStdDevStr);
        const yourHBN = parseFloat(yourHBNStr);
        const yourFinal = parseFloat(yourFinalStr);
        const finalMin = parseInt(faculty);

        if (isNaN(n) || isNaN(classMean) || isNaN(classStdDev) || isNaN(yourHBN) || isNaN(yourFinal)) {
            setResult({ finalGrade: '', reason: '', stats: null, error: 'Lütfen tüm sayısal alanları eksiksiz doldurun.', warning: null });
            return;
        }

        let reasonParts: string[] = [];
        let finalGrade: string;

        if (yourFinal < finalMin) {
            finalGrade = 'FF';
            reasonParts.push(`Final notunuz (${yourFinal}), fakülteniz için belirlenen minimum sınır olan ${finalMin}'den düşük olduğu için notunuz doğrudan FF olarak belirlenmiştir.`);
            setResult({ finalGrade, reason: reasonParts.join('<br>'), stats: null, error: null, warning: null });
            return;
        }
        
        let isMutlak = false;
        if (n <= 10) {
            isMutlak = true;
            reasonParts.push(`Öğrenci sayısı (${n}) 10 veya daha az olduğu için <strong>Mutlak Değerlendirme Sistemi (Tablo-3)</strong> kullanılmıştır.`);
        } else if (classMean >= 80) {
            isMutlak = true;
            reasonParts.push(`Sınıfın ham başarı notu ortalaması (${classMean.toFixed(2)}) 80'den yüksek olduğu için <strong>Mutlak Değerlendirme Sistemi (Tablo-3)</strong> kullanılmıştır.`);
        }

        let rawCalculatedGrade: LetterGrade;
        let tScore: number | undefined;

        if (isMutlak) {
            rawCalculatedGrade = getGradeFromMutlak(yourHBN);
        } else {
            // Relative System
            if (n >= 30) {
                tScore = classStdDev > 0 ? ((yourHBN - classMean) / classStdDev) * 10 + 50 : 50;
                rawCalculatedGrade = getGradeFromTScore(tScore, classMean);
                reasonParts.push(`Öğrenci sayısı (${n}) 29'dan fazla olduğu için <strong>T-Skoru Sistemi (Tablo-1)</strong> kullanılmıştır.`);
                if(tScore) reasonParts.push(`Hesaplanan T-Skorunuz: <strong>${tScore.toFixed(2)}</strong>`);
            } else { // Case for 11 <= n <= 29
                setResult({
                    finalGrade: '', reason: '', stats: null, error: null,
                    warning: `Öğrenci sayısı 11 ile 29 arasında olduğunda, notunuzu hesaplamak için sınıftaki tüm notların listesi gereklidir. Bu yöntem, notların sıralanıp yüzdelik dilimlere ayrılmasına dayandığı için sadece ortalama ve standart sapma ile hesaplanamaz.`
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

        setResult({ finalGrade, reason: reasonParts.join('<br>'), stats: { tScore }, error: null, warning: null });
    };

    return (
        <div className="max-w-4xl w-full">
            <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">KTÜ Harf Notu Hesaplayıcı</h1>
                    <p className="text-gray-600 mt-2">Sınıf istatistiklerini girerek harf notunuzu hesaplayın.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Input Column */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Not Bilgileri</h2>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="studentCount" className="block text-sm font-medium text-gray-700 mb-1">Dersteki Öğrenci Sayısı</label>
                                <input type="number" id="studentCount" value={inputs.studentCount} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Örn: 45" />
                            </div>
                            <div>
                                <label htmlFor="classMean" className="block text-sm font-medium text-gray-700 mb-1">Sınıf HBN Ortalaması</label>
                                <input type="number" id="classMean" value={inputs.classMean} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Örn: 62.5" />
                            </div>
                             <div>
                                <label htmlFor="classStdDev" className="block text-sm font-medium text-gray-700 mb-1">Sınıf HBN Standart Sapması</label>
                                <input type="number" id="classStdDev" value={inputs.classStdDev} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Örn: 8.2" />
                            </div>
                            <hr className="my-2 border-t-2 border-dashed"/>
                            <div>
                                <label htmlFor="yourHBN" className="block text-sm font-medium text-gray-700 mb-1">Kendi Ham Başarı Notunuz (HBN)</label>
                                <input type="number" id="yourHBN" value={inputs.yourHBN} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Örn: 75" />
                            </div>
                            <div>
                                <label htmlFor="yourFinal" className="block text-sm font-medium text-gray-700 mb-1">Final/Bütünleme Sınav Notunuz</label>
                                <input type="number" id="yourFinal" value={inputs.yourFinal} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Örn: 80" />
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
                            {result?.error && <ResultCard style={GradeColors.WARN} title="Hata"><p>{result.error}</p></ResultCard>}
                            {result?.warning && <ResultCard style={GradeColors.WARN} title="Bilgilendirme"><p>{result.warning}</p></ResultCard>}
                            {result?.finalGrade && (
                                <>
                                    <ResultCard style={GradeColors[result.finalGrade] || GradeColors.STATS} title="Hesaplanan Harf Notunuz">
                                        <span className="text-3xl font-extrabold">{result.finalGrade}</span>
                                    </ResultCard>
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
