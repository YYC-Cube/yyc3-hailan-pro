import * as React from 'react';
import { usePrivacy } from '../../context/PrivacyContext';
import { Lock, Unlock, Fingerprint, Delete, ChevronLeft, MoreVertical, Search, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { cn } from '../../../lib/utils';

export const CamouflageScreen: React.FC = () => {
  const { isLocked, unlockApp, unlockCode, camouflageMode, biometricEnabled } = usePrivacy();
  const [input, setInput] = React.useState('');
  const [scanning, setScanning] = React.useState(false);

  React.useEffect(() => {
    if (isLocked) {
      setInput('');
      setScanning(false);
    }
  }, [isLocked]);

  const handleUnlock = () => {
    if (input === unlockCode) {
      toast.success('Identity Verified', { icon: <Unlock className="w-4 h-4 text-emerald-500" /> });
      unlockApp();
    } else {
      toast.error('Verification Failed', { icon: <Lock className="w-4 h-4 text-red-500" /> });
      setInput('');
    }
  };

  const handleBiometric = async () => {
    setScanning(true);
    setTimeout(() => {
      toast.success('Biometric Verified');
      unlockApp();
      setScanning(false);
    }, 1000);
  };

  if (!isLocked) return null;

  if (camouflageMode === 'calculator') {
    return <CalculatorMode input={input} setInput={setInput} onUnlock={handleUnlock} />;
  }
  
  if (camouflageMode === 'notes') {
    return <NotesMode input={input} setInput={setInput} onUnlock={handleUnlock} />;
  }

  return (
    <div className="fixed inset-0 z-[100] bg-white backdrop-blur-xl flex flex-col items-center justify-center p-6 animate-fadeIn">
      <div className="w-full max-w-sm space-y-8 text-center">
        <div className="space-y-2">
          <div className="mx-auto w-16 h-16 bg-[#0056b3]/10 rounded-full flex items-center justify-center mb-6">
            <Lock className="w-8 h-8 text-[#0056b3]" />
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">HaiLan Secure</h2>
          <p className="text-neutral-500 text-sm">Enter your PIN to access your private space</p>
        </div>

        <div className="flex justify-center gap-4 my-8">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={cn("w-4 h-4 rounded-full transition-all duration-300", input.length > i ? "bg-[#0056b3]" : "bg-neutral-200")} />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-[280px] mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <Button
              key={num}
              variant="outline"
              className="h-16 w-16 rounded-full text-xl font-medium border-neutral-100 hover:bg-neutral-50"
              onClick={() => {
                const newInput = input + num;
                setInput(newInput);
                if (newInput.length === 4) {
                   if (newInput === unlockCode) unlockApp();
                   else { toast.error('Incorrect PIN'); setInput(''); }
                }
              }}
            >
              {num}
            </Button>
          ))}
          <div className="flex items-center justify-center">
             {biometricEnabled && (
               <Button variant="ghost" size="icon" className={cn("h-16 w-16 rounded-full", scanning && "animate-pulse text-[#0056b3]")} onClick={handleBiometric}>
                 <Fingerprint className="w-8 h-8" />
               </Button>
             )}
          </div>
          <Button
            variant="outline"
            className="h-16 w-16 rounded-full text-xl font-medium border-neutral-100 hover:bg-neutral-50"
            onClick={() => {
              const newInput = input + '0';
              setInput(newInput);
              if (newInput.length === 4) {
                 if (newInput === unlockCode) unlockApp();
                 else { toast.error('Incorrect PIN'); setInput(''); }
              }
            }}
          >
            0
          </Button>
          <Button variant="ghost" className="h-16 w-16 rounded-full" onClick={() => setInput(input.slice(0, -1))}>
            <Delete className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const CalculatorMode = ({ input, setInput, onUnlock }: { input: string, setInput: (s: string) => void, onUnlock: () => void }) => {
  const [display, setDisplay] = React.useState('0');
  const handlePress = (val: string) => {
    if (val === 'C') { setDisplay('0'); setInput(''); }
    else if (val === '=') { if (display === input && input.length > 0) onUnlock(); else { setDisplay('Error'); setTimeout(() => setDisplay('0'), 1000); } }
    else { const newDisplay = display === '0' ? val : display + val; setDisplay(newDisplay); setInput(newDisplay); }
  };
  return (
    <div className="fixed inset-0 z-[100] bg-[#002b5c] text-white flex flex-col font-mono animate-fadeIn">
      <div className="flex-1 flex items-end justify-end p-8 text-6xl font-light tracking-tighter break-all">{display}</div>
      <div className="grid grid-cols-4 gap-1 p-1 pb-8">
        {['C', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='].map((btn) => (
          <button key={btn} className={cn("h-20 rounded-full text-2xl font-medium transition-colors active:opacity-70 flex items-center justify-center m-1", btn === '0' ? "col-span-2 items-start pl-8" : "", ['÷', '×', '-', '+', '='].includes(btn) ? "bg-amber-500 text-white" : ['C', '±', '%'].includes(btn) ? "bg-neutral-400 text-white/90" : "bg-neutral-800")} onClick={() => handlePress(btn)}>{btn}</button>
        ))}
      </div>
    </div>
  );
};

const NotesMode = ({ input, setInput, onUnlock }: { input: string, setInput: (s: string) => void, onUnlock: () => void }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-neutral-50 text-neutral-900 flex flex-col animate-fadeIn">
      <div className="p-4 bg-white shadow-sm z-10">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="icon"><ChevronLeft /></Button>
          <span className="font-semibold text-lg">Notes</span>
          <div className="ml-auto flex gap-2"><Button variant="ghost" size="icon"><MoreVertical /></Button></div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <Input className="pl-9 bg-neutral-100 border-none" placeholder="Search notes..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && onUnlock()} />
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4 space-y-4">
         <div className="p-4 bg-white rounded-xl shadow-sm border border-neutral-100"><h3 className="font-semibold mb-1">Grocery List</h3><p className="text-sm text-neutral-500">Milk, Eggs, Bread...</p></div>
         <div className="p-4 bg-white rounded-xl shadow-sm border border-neutral-100"><h3 className="font-semibold mb-1">Meeting Notes</h3><p className="text-sm text-neutral-500">Discuss strategy...</p></div>
      </div>
      <div className="absolute bottom-6 right-6"><Button size="icon" className="h-14 w-14 rounded-full shadow-lg bg-amber-500"><Plus className="w-6 h-6" /></Button></div>
    </div>
  );
};
