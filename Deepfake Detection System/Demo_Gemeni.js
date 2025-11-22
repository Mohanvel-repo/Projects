import React, { useState, useEffect } from 'react';
import { Upload, Shield, AlertTriangle, CheckCircle, Activity, Eye, Layers, Play, Pause, BarChart2, AlertOctagon, RefreshCw } from 'lucide-react';

// --- Mock Data & Assets ---
const MOCK_VIDEO_THUMB = "/api/placeholder/800/450"; // Using a placeholder logic concept

export default function App() {
  const [appState, setAppState] = useState('idle'); // idle, scanning, results
  const [progress, setProgress] = useState(0);
  const [scanStep, setScanStep] = useState('');
  const [fileName, setFileName] = useState('');

  // Simulate the scanning process
  const startScan = (file) => {
    setFileName(file.name);
    setAppState('scanning');
    setProgress(0);

    const steps = [
      { pct: 10, msg: "Extracting frames..." },
      { pct: 30, msg: "Analyzing facial landmarks..." },
      { pct: 50, msg: "Detecting heartbeat (PPG) signals..." },
      { pct: 75, msg: "Comparing audio-visual synchronization..." },
      { pct: 90, msg: "Scanning for GAN artifacts..." },
      { pct: 100, msg: "Finalizing forensic report..." }
    ];

    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep >= steps.length) {
        clearInterval(interval);
        setAppState('results');
      } else {
        setProgress(steps[currentStep].pct);
        setScanStep(steps[currentStep].msg);
        currentStep++;
      }
    }, 800);
  };

  const reset = () => {
    setAppState('idle');
    setProgress(0);
    setFileName('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500 selection:text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">VeriScan <span className="text-blue-500">AI</span></span>
          </div>
          <div className="flex space-x-6 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Dashboard</a>
            <a href="#" className="hover:text-white transition-colors">History</a>
            <a href="#" className="hover:text-white transition-colors">API</a>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-green-500 text-xs uppercase">System Online</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {appState === 'idle' && <UploadView onUpload={startScan} />}
        
        {appState === 'scanning' && (
          <ScanningView progress={progress} step={scanStep} fileName={fileName} />
        )}
        
        {appState === 'results' && <ResultsDashboard fileName={fileName} onReset={reset} />}

      </main>
    </div>
  );
}

// --- Sub-Components ---

function UploadView({ onUpload }) {
  const handleDrop = (e) => {
    e.preventDefault();
    // In a real app, we'd handle the file object here
    onUpload({ name: "interview_footage_candidate_04.mp4" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-in fade-in zoom-in duration-500">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Is it Real or Deepfake?</h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Deploy state-of-the-art forensic AI to analyze video, audio, and imagery for manipulation anomalies, GAN fingerprints, and biological signals.
        </p>
      </div>

      <div 
        className="w-full max-w-2xl h-64 border-2 border-dashed border-slate-700 bg-slate-900/50 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-slate-800/50 transition-all group relative overflow-hidden"
        onClick={() => onUpload({ name: "demo_clip.mp4" })}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="bg-slate-800 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 shadow-xl shadow-black/50">
          <Upload className="w-8 h-8 text-blue-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Drop your file here to analyze</h3>
        <p className="text-sm text-slate-500">Supports MP4, MOV, WAV, JPG, PNG (Max 500MB)</p>
        
        <div className="mt-6 flex items-center space-x-4 text-xs text-slate-500 uppercase tracking-wider">
          <span className="flex items-center"><Shield className="w-3 h-3 mr-1" /> Secure</span>
          <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
          <span className="flex items-center"><Layers className="w-3 h-3 mr-1" /> Multi-Layer Scan</span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
        <FeatureCard icon={<Eye />} title="Visual Artifacts" desc="Detects warping & blurring." />
        <FeatureCard icon={<Activity />} title="Biological Signals" desc="Analyzes pulse & blinking." />
        <FeatureCard icon={<BarChart2 />} title="Audio Sync" desc="Checks lip movement mismatch." />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-start space-x-3 hover:border-slate-700 transition-colors">
      <div className="text-blue-500 mt-1">{icon}</div>
      <div>
        <h4 className="font-semibold text-slate-200 text-sm">{title}</h4>
        <p className="text-slate-500 text-xs">{desc}</p>
      </div>
    </div>
  );
}

function ScanningView({ progress, step, fileName }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-end mb-2">
          <span className="text-white font-medium text-lg">Analyzing <span className="text-blue-400">{fileName}</span></span>
          <span className="text-blue-400 font-mono">{progress}%</span>
        </div>
        
        {/* Progress Bar */}
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-purple-500 transition-all duration-300 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>

        {/* Status Text */}
        <div className="mt-6 flex items-center justify-center space-x-3 text-slate-400 bg-slate-900/50 py-3 px-6 rounded-full border border-slate-800">
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span className="text-sm font-mono animate-pulse">{step}</span>
        </div>

        {/* Visual Decorator */}
        <div className="mt-12 grid grid-cols-4 gap-2 opacity-30">
            {[...Array(16)].map((_, i) => (
               <div key={i} className="h-8 bg-slate-800 rounded animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div> 
            ))}
        </div>
      </div>
    </div>
  );
}

function ResultsDashboard({ fileName, onReset }) {
  // Mock Analysis Data
  const fakeProbability = 94;
  const isFake = fakeProbability > 50;
  
  return (
    <div className="animate-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Forensic Analysis Report</h2>
          <div className="flex items-center space-x-2 text-slate-400 text-sm">
            <span>File: {fileName}</span>
            <span>•</span>
            <span>ID: #8X-29382</span>
            <span>•</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="flex space-x-3">
           <button onClick={onReset} className="px-4 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 text-sm font-medium transition-colors">
             Upload New File
           </button>
           <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors shadow-lg shadow-blue-900/20">
             Download PDF Report
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COL: Video Player & Timeline */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Video Player Container */}
          <div className="relative bg-black rounded-xl overflow-hidden border border-slate-800 aspect-video group">
             {/* Fake Video Overlay UI */}
             <div className="absolute top-4 left-4 z-10 flex space-x-2">
               <span className="bg-red-500/90 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded flex items-center shadow-lg">
                 <AlertOctagon className="w-3 h-3 mr-1" /> DETECTED
               </span>
               <span className="bg-black/50 backdrop-blur text-white text-xs font-mono px-2 py-1 rounded border border-white/10">
                 FRAME: 1042
               </span>
             </div>

             {/* The "Face" Box Overlay */}
             <div className="absolute top-[20%] left-[35%] w-[30%] h-[50%] border-2 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)] rounded-lg opacity-80">
                <div className="absolute -top-6 left-0 bg-red-500 text-white text-[10px] font-bold px-1 rounded-t">
                    CONFIDENCE: 98%
                </div>
                {/* Heatmap Simulation */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/20 to-transparent mix-blend-overlay"></div>
             </div>

             {/* Fake Video Content (Gradient Placeholder) */}
             <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <Play className="w-16 h-16 text-white/20" />
             </div>

             {/* Controls */}
             <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
               <div className="flex items-center space-x-4">
                 <Play className="w-5 h-5 text-white cursor-pointer hover:text-blue-400" />
                 <div className="flex-1 h-1 bg-slate-700 rounded-full cursor-pointer group/track">
                   <div className="w-[45%] h-full bg-red-500 relative">
                     <div className="absolute right-0 -top-1 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover/track:opacity-100"></div>
                   </div>
                 </div>
                 <span className="text-xs font-mono text-slate-300">00:14 / 00:32</span>
               </div>
             </div>
          </div>

          {/* Deepfake Timeline */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-slate-200">Manipulation Probability Timeline</h3>
                <div className="flex items-center space-x-2 text-xs">
                    <div className="flex items-center"><div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div> High</div>
                    <div className="flex items-center"><div className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></div> Med</div>
                    <div className="flex items-center"><div className="w-2 h-2 bg-slate-600 rounded-full mr-1"></div> Safe</div>
                </div>
            </div>
            {/* CSS Bar Chart Simulation */}
            <div className="h-24 flex items-end justify-between space-x-1">
                {[6, 8, 12, 8, 5, 20, 45, 85, 92, 96, 90, 88, 70, 40, 25, 10, 5, 5, 8, 12, 15, 10, 8, 6, 50, 95, 98, 92, 50, 20].map((height, i) => (
                    <div 
                        key={i} 
                        className={`w-full rounded-t-sm transition-all hover:opacity-80 cursor-crosshair ${height > 80 ? 'bg-red-500' : height > 40 ? 'bg-yellow-500' : 'bg-slate-700'}`}
                        style={{ height: `${height}%` }}
                        title={`Time: 00:${i} - Score: ${height}%`}
                    ></div>
                ))}
            </div>
          </div>
        </div>

        {/* RIGHT COL: Analysis Details */}
        <div className="space-y-6">
          
          {/* Overall Score Card */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <AlertTriangle className="w-32 h-32 text-red-500" />
            </div>
            <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-4">Overall Verdict</h3>
            
            <div className="flex items-center space-x-4 mb-4">
                <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <path className="text-slate-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                        <path className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" strokeDasharray={`${fakeProbability}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                    </svg>
                    <div className="absolute text-2xl font-bold text-white">{fakeProbability}%</div>
                </div>
                <div>
                    <div className="text-3xl font-bold text-red-500 mb-1">MANIPULATED</div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        High probability of synthetic media generation detected. Do not trust this file.
                    </p>
                </div>
            </div>
          </div>

          {/* Detailed Artifacts */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
             <h3 className="text-slate-200 font-semibold mb-4 flex items-center">
                <Activity className="w-4 h-4 mr-2 text-blue-400" />
                Detection Breakdown
             </h3>
             
             <div className="space-y-4">
                 <ResultItem 
                    label="Lip-Sync Mismatch" 
                    score={96} 
                    color="red" 
                    desc="Audio phonemes do not align with mouth visemes."
                 />
                 <ResultItem 
                    label="Unnatural Blinking" 
                    score={82} 
                    color="orange" 
                    desc="Blink frequency is statistically lower than human average."
                 />
                 <ResultItem 
                    label="Inconsistent Texture" 
                    score={45} 
                    color="green" 
                    desc="Skin texture noise levels are consistent with camera sensor."
                 />
                 <ResultItem 
                    label="Pulse (PPG) Signal" 
                    score={89} 
                    color="red" 
                    desc="No detectable blood flow pattern in cheek area."
                 />
             </div>
          </div>

          {/* Metadata */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
             <h3 className="text-slate-200 font-semibold mb-3 text-sm">File Metadata</h3>
             <div className="space-y-2 text-xs text-slate-400 font-mono">
                <div className="flex justify-between"><span>Resolution:</span> <span className="text-slate-300">1920x1080</span></div>
                <div className="flex justify-between"><span>Frame Rate:</span> <span className="text-slate-300">30fps</span></div>
                <div className="flex justify-between"><span>Audio Codec:</span> <span className="text-slate-300">AAC LC</span></div>
                <div className="flex justify-between"><span>Duration:</span> <span className="text-slate-300">00:32</span></div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function ResultItem({ label, score, color, desc }) {
    const colorClasses = {
        red: "bg-red-500",
        orange: "bg-orange-500",
        green: "bg-green-500"
    };
    const textColors = {
        red: "text-red-400",
        orange: "text-orange-400",
        green: "text-green-400"
    };

    return (
        <div>
            <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-slate-300">{label}</span>
                <span className={`text-sm font-bold ${textColors[color]}`}>{score}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full mb-1">
                <div className={`h-full rounded-full ${colorClasses[color]}`} style={{ width: `${score}%` }}></div>
            </div>
            <p className="text-[11px] text-slate-500">{desc}</p>
        </div>
    )
}