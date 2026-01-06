import { supabase } from '@/lib/supabase';
import { User, Submission } from '@/types';
import { notFound } from 'next/navigation';
import DashboardClient from './DashboardClient'; // Client component for Charts

export default async function DashboardPage({ params }: { params: { lineId: string } }) {
    const { data: user } = await supabase
        .from('users')
        .select('*')
        .eq('line_id', params.lineId)
        .single();

    if (!user) {
        notFound();
    }

    // Fetch recent submissions for stats
    const { data: submissions } = await supabase
        .from('submissions')
        .select('*')
        .eq('user_id', user.id)
        .order('submitted_at', { ascending: false });

    return (
        <div className="min-h-screen bg-slate-900 text-white p-6">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-amber-400">ProficienThAI</h1>
                    <p className="text-slate-400">Scholar Dashboard</p>
                </div>
                <div className="text-right">
                    <h2 className="text-xl font-bold">{user.display_name}</h2>
                    <span className="bg-amber-500 text-slate-900 px-2 py-1 rounded text-xs font-bold uppercase">{user.level}</span>
                </div>
            </header>

            <DashboardClient user={user} submissions={submissions || []} />
        </div>
    );
}
