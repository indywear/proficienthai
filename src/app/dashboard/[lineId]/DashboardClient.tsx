'use client';

import { User, Submission } from '@/types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Zap, Award, TrendingUp, Activity } from 'lucide-react';

export default function DashboardClient({ user, submissions }: { user: User, submissions: Submission[] }) {

    // Calculate average stats
    let grammar = 0, vocab = 0, org = 0, resp = 0;
    if (submissions.length > 0) {
        submissions.forEach(s => {
            grammar += s.score_details?.grammar || 0;
            vocab += s.score_details?.vocab || 0;
            org += s.score_details?.organization || 0;
            resp += s.score_details?.task_response || 0;
        });
        const count = submissions.length;
        grammar /= count;
        vocab /= count;
        org /= count;
        resp /= count;
    }

    const data = [
        { subject: 'Grammar', A: grammar, fullMark: 10 },
        { subject: 'Vocab', A: vocab, fullMark: 10 },
        { subject: 'Spelling', A: (grammar + vocab) / 2, fullMark: 10 }, // Mock
        { subject: 'Org', A: org, fullMark: 10 },
        { subject: 'Response', A: resp, fullMark: 10 },
    ];

    return (
        <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stats Cards */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex items-center justify-between">
                    <div>
                        <h3 className="text-slate-400 text-sm uppercase flex items-center gap-2">
                            <Award className="w-4 h-4 text-amber-400" /> Total Points
                        </h3>
                        <p className="text-4xl font-bold text-amber-400 mt-2">{user.points}</p>
                    </div>
                    <Activity className="w-8 h-8 text-slate-600" />
                </div>
                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex items-center justify-between">
                    <div>
                        <h3 className="text-slate-400 text-sm uppercase flex items-center gap-2">
                            <Zap className="w-4 h-4 text-blue-400" /> Current Streak
                        </h3>
                        <p className="text-4xl font-bold text-blue-400 mt-2">{user.streak} Days</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-slate-600" />
                </div>
            </motion.div>

            {/* Radar Chart */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 h-[300px]">
                <h3 className="text-slate-400 text-sm uppercase mb-4">Skill Analysis</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                        <PolarGrid stroke="#475569" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                        <Radar name="Skills" dataKey="A" stroke="#fbbf24" strokeWidth={2} fill="#fbbf24" fillOpacity={0.3} />
                    </RadarChart>
                </ResponsiveContainer>
            </motion.div>
        </main>
    );
}
