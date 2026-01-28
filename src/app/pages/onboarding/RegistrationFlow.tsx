import React from "react";
import { Button } from "@/app/components/design-system/Button";
import { FloatingInput } from "@/app/components/design-system/FloatingInput";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/app/components/design-system/Modal";
import { Shield, Bell, Camera, MapPin, CheckCircle2, ChevronRight, ChevronLeft, Lock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/app/components/design-system/utils";
import { InteractiveListItem, GlassCard } from "@/app/components/design-system/GlassCard";

interface RegistrationFlowProps {
  onComplete: () => void;
}

export function RegistrationFlow({ onComplete }: RegistrationFlowProps) {
  const [step, setStep] = React.useState(1);
  const [showPermissions, setShowPermissions] = React.useState(false);

  const nextStep = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      setShowPermissions(true);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handlePermissionComplete = () => {
    setShowPermissions(false);
    onComplete();
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-4">
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-deep-blue/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent" />
      </div>

      <GlassCard 
        className="w-full max-w-md flex flex-col min-h-[500px] z-10"
        hoverEffect={false}
      >
        {/* Progress Bar */}
        <div className="h-1.5 bg-neutral-100/50 w-full">
          <motion.div 
            className="h-full bg-gradient-to-r from-brand-deep-blue to-brand-light-blue"
            initial={{ width: 0 }}
            animate={{ width: `${(step / 5) * 100}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 flex flex-col relative">
           <AnimatePresence mode="wait">
             <motion.div
               key={step}
               initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
               animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
               exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
               transition={{ duration: 0.4, ease: "easeOut" }}
               className="flex-1 flex flex-col"
             >
                {step === 1 && <Step1Email />}
                {step === 2 && <Step2Password />}
                {step === 3 && <Step3Preferences />}
                {step === 4 && <Step4PrivacySettings />}
                {step === 5 && <Step5Welcome />}
             </motion.div>
           </AnimatePresence>

           {/* Navigation Buttons */}
           <div className="mt-8 flex justify-between items-center pt-6 border-t border-neutral-100">
              {step > 1 && step < 5 ? (
                <Button variant="ghost" onClick={prevStep} className="text-neutral-500 hover:text-neutral-800">
                   <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </Button>
              ) : <div></div>}
              
              <Button 
                onClick={nextStep} 
                variant="liquid"
                className="ml-auto px-6"
              >
                 {step === 5 ? "Get Started" : "Next"} 
                 {step !== 5 && <ChevronRight className="w-4 h-4 ml-1" />}
              </Button>
           </div>
        </div>
      </GlassCard>

      <PermissionModal open={showPermissions} onComplete={handlePermissionComplete} />
    </div>
  );
}

// --- Step Components ---

function Step1Email() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-deep-blue to-neutral-800">
          Create Account
        </h2>
        <p className="text-neutral-500 text-sm font-medium">We value your privacy. Your email will be encrypted.</p>
      </div>
      <div className="space-y-4 pt-4">
        <FloatingInput 
          label="Email or Phone" 
          type="email" 
          icon={<Shield className="w-5 h-5" />} 
        />
        <div className="flex items-center gap-2 px-2">
          <Shield className="w-3 h-3 text-brand-green" />
          <p className="text-xs text-brand-green font-medium">Private & Encrypted Registration</p>
        </div>
      </div>
    </div>
  );
}

function Step2Password() {
  const [password, setPassword] = React.useState("");
  const strength = Math.min(password.length * 10, 100);
  
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-deep-blue to-neutral-800">
          Set Password
        </h2>
        <p className="text-neutral-500 text-sm">Secure your account with a strong password.</p>
      </div>
      <div className="space-y-6 pt-2">
        <FloatingInput 
          label="Password" 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<Lock className="w-5 h-5" />}
        />
        
        {/* Strength Indicator */}
        <div className="space-y-2 bg-neutral-50 p-3 rounded-xl border border-neutral-100">
           <div className="flex justify-between text-xs text-neutral-500 font-medium px-1">
              <span>Password Strength</span>
              <span className={cn(
                "transition-colors",
                strength < 30 ? "text-brand-coral" : strength < 70 ? "text-brand-gold" : "text-brand-green"
              )}>
                {strength < 30 ? "Weak" : strength < 70 ? "Medium" : "Strong"}
              </span>
           </div>
           <div className="h-2 w-full bg-neutral-200 rounded-full overflow-hidden">
              <motion.div 
                className={cn(
                   "h-full rounded-full shadow-sm",
                   strength < 30 ? "bg-brand-coral" : strength < 70 ? "bg-brand-gold" : "bg-brand-green"
                )}
                initial={{ width: 0 }}
                animate={{ width: `${strength}%` }}
                transition={{ type: "spring", stiffness: 50 }}
              />
           </div>
        </div>
      </div>
    </div>
  );
}

function Step3Preferences() {
  const [preferences, setPreferences] = React.useState<string[]>([]);
  
  const toggle = (id: string) => {
     if (preferences.includes(id)) {
        setPreferences(preferences.filter(p => p !== id));
     } else {
        setPreferences([...preferences, id]);
     }
  };

  const options = [
     { id: "health", label: "Health & Wellness", emoji: "🌿", desc: "Supplements & Care" },
     { id: "toys", label: "Smart Toys", emoji: "🎮", desc: "Interactive Devices" },
     { id: "couple", label: "Couple Play", emoji: "❤️", desc: "Enhance Intimacy" },
     { id: "learn", label: "Education", emoji: "📚", desc: "Guides & Tips" },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-neutral-900">Your Interests</h2>
        <p className="text-neutral-500 text-sm">Help us personalize your experience (Optional).</p>
      </div>
      <div className="grid grid-cols-1 gap-3">
         {options.map(opt => (
            <motion.button
               key={opt.id}
               onClick={() => toggle(opt.id)}
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               className={cn(
                  "flex items-center p-4 rounded-xl border text-left transition-all relative overflow-hidden group",
                  preferences.includes(opt.id) 
                     ? "border-brand-deep-blue bg-white shadow-md ring-1 ring-brand-deep-blue/20" 
                     : "border-neutral-200 bg-neutral-50/50 hover:bg-white hover:border-neutral-300"
               )}
            >
               {preferences.includes(opt.id) && (
                 <motion.div 
                   layoutId="active-bg"
                   className="absolute inset-0 bg-brand-deep-blue/5 z-0" 
                 />
               )}
               <span className="text-3xl mr-4 relative z-10">{opt.emoji}</span>
               <div className="relative z-10">
                 <span className={cn(
                   "text-sm font-semibold block",
                   preferences.includes(opt.id) ? "text-brand-deep-blue" : "text-neutral-700"
                 )}>
                   {opt.label}
                 </span>
                 <span className="text-xs text-neutral-500">{opt.desc}</span>
               </div>
               
               {preferences.includes(opt.id) && (
                 <div className="absolute right-4 text-brand-deep-blue">
                   <CheckCircle2 className="w-5 h-5" />
                 </div>
               )}
            </motion.button>
         ))}
      </div>
    </div>
  );
}

function Step4PrivacySettings() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-neutral-900">Privacy Control</h2>
        <p className="text-neutral-500 text-sm">Review your default privacy settings.</p>
      </div>
      <div className="space-y-3">
         <PrivacyToggle label="Disguise App Icon" description="Change app icon to 'Calculator'" defaultChecked />
         <PrivacyToggle label="Blur Recent Apps" description="Blur screen in multitask view" defaultChecked />
         <PrivacyToggle label="Biometric Lock" description="Require FaceID to open" defaultChecked />
      </div>
    </div>
  );
}

function PrivacyToggle({ label, description, defaultChecked }: { label: string, description: string, defaultChecked?: boolean }) {
   const [checked, setChecked] = React.useState(defaultChecked);
   return (
      <InteractiveListItem 
        className="justify-between bg-white border-neutral-100 shadow-sm"
        onClick={() => setChecked(!checked)}
      >
         <div>
            <div className="font-semibold text-sm text-neutral-800">{label}</div>
            <div className="text-xs text-neutral-500">{description}</div>
         </div>
         <div 
            className={cn(
               "w-11 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out cursor-pointer",
               checked ? "bg-brand-deep-blue" : "bg-neutral-200"
            )}
         >
            <motion.div 
               className="w-4 h-4 bg-white rounded-full shadow-sm"
               animate={{ x: checked ? 20 : 0 }}
               transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
         </div>
      </InteractiveListItem>
   )
}

function Step5Welcome() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
       <motion.div 
         initial={{ scale: 0 }}
         animate={{ scale: 1 }}
         transition={{ type: "spring", stiffness: 200, damping: 15 }}
         className="w-24 h-24 bg-gradient-to-tr from-brand-green to-emerald-300 rounded-full flex items-center justify-center text-white shadow-lg shadow-brand-green/20"
       >
          <CheckCircle2 className="w-12 h-12" />
       </motion.div>
       
       <div>
          <h2 className="text-4xl font-bold text-neutral-900 mb-3 tracking-tight">Welcome!</h2>
          <p className="text-neutral-500 text-lg">Your private space is ready.</p>
       </div>
       
       <div className="bg-neutral-50 border border-neutral-100 p-6 rounded-2xl text-sm text-neutral-600 max-w-xs italic relative">
          <span className="absolute -top-3 left-6 text-4xl text-neutral-200 font-serif">"</span>
          Remember, your data is encrypted and only accessible by you.
       </div>
    </div>
  );
}

// --- Permission Modal ---

function PermissionModal({ open, onComplete }: { open: boolean, onComplete: () => void }) {
   return (
      <Dialog open={open} onOpenChange={(val) => !val && onComplete()}>
         <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-xl border-white/20">
            <DialogHeader>
               <DialogTitle className="text-xl">Enable Full Experience?</DialogTitle>
               <DialogDescription>
                  We need a few permissions to provide the best features. All are optional.
               </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-6">
               <PermissionItem 
                  icon={MapPin} 
                  title="Location" 
                  desc="For finding nearby smart vending machines." 
               />
               <PermissionItem 
                  icon={Bell} 
                  title="Notifications" 
                  desc="For discreet order updates and health reminders." 
               />
               <PermissionItem 
                  icon={Camera} 
                  title="Camera" 
                  desc="For AR product previews." 
               />
            </div>
            <DialogFooter className="flex-col sm:flex-col gap-3">
               <Button onClick={onComplete} variant="liquid" className="w-full">Allow Selected</Button>
               <Button variant="ghost" onClick={onComplete} className="w-full">Skip All</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}

function PermissionItem({ icon: Icon, title, desc }: { icon: React.ElementType, title: string, desc: string }) {
   const [allowed, setAllowed] = React.useState(false);
   
   return (
      <InteractiveListItem 
        className="flex items-start gap-4 p-4 rounded-xl border border-neutral-100 bg-white shadow-sm"
        onClick={() => setAllowed(!allowed)}
        active={allowed}
      >
         <div className={cn(
           "p-2.5 rounded-lg transition-colors",
           allowed ? "bg-brand-deep-blue text-white" : "bg-neutral-100 text-neutral-600"
         )}>
            <Icon className="w-5 h-5" />
         </div>
         <div className="flex-1">
            <div className="font-semibold text-sm text-neutral-900">{title}</div>
            <div className="text-xs text-neutral-500 mt-0.5">{desc}</div>
         </div>
         <Button 
           variant={allowed ? "default" : "outline"} 
           size="sm" 
           className={cn("h-8 text-xs transition-all", allowed && "bg-brand-deep-blue border-transparent")}
         >
           {allowed ? "Allowed" : "Allow"}
         </Button>
      </InteractiveListItem>
   )
}
