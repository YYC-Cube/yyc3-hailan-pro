import React from 'react';
import { useUser } from '@/app/context/UserContext';
import { Switch } from '@/app/components/ui/switch';
import { Lock, Eye, Bell, Trash2, Fingerprint, History } from 'lucide-react';
import { motion } from 'framer-motion';

export function PrivacySettings() {
  const { settings, updateSettings } = useUser();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-neutral-900">Privacy & Security</h2>
        <p className="text-neutral-500 text-sm mt-1">Manage your data visibility and security preferences.</p>
      </div>

      <div className="space-y-4">
        {/* Privacy Mode */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100 flex items-center justify-between"
        >
          <div className="flex items-start gap-4">
            <div className="p-2 bg-purple-50 rounded-lg text-brand-elegant-purple">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-medium text-neutral-900">Privacy Mode</h3>
              <p className="text-sm text-neutral-500 mt-1 max-w-md">
                Blur sensitive images and text when browsing in public spaces. 
                Shake device to instantly toggle.
              </p>
            </div>
          </div>
          <Switch 
            checked={settings.privacyMode} 
            onCheckedChange={(checked: boolean) => updateSettings({ privacyMode: checked })} 
          />
        </motion.div>

        {/* Discreet Notifications */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100 flex items-center justify-between"
        >
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-50 rounded-lg text-brand-deep-blue">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-medium text-neutral-900">Discreet Notifications</h3>
              <p className="text-sm text-neutral-500 mt-1 max-w-md">
                Hide order details and sender information in push notifications.
                Notifications will appear as "System Update".
              </p>
            </div>
          </div>
          <Switch 
            checked={settings.discreetNotifications} 
            onCheckedChange={(checked: boolean) => updateSettings({ discreetNotifications: checked })} 
          />
        </motion.div>

        {/* Biometric Login */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100 flex items-center justify-between"
        >
          <div className="flex items-start gap-4">
            <div className="p-2 bg-green-50 rounded-lg text-brand-green">
              <Fingerprint className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-medium text-neutral-900">Biometric Access</h3>
              <p className="text-sm text-neutral-500 mt-1 max-w-md">
                Require FaceID or TouchID to open the application or access order history.
              </p>
            </div>
          </div>
          <Switch 
            checked={settings.biometricLogin} 
            onCheckedChange={(checked: boolean) => updateSettings({ biometricLogin: checked })} 
          />
        </motion.div>

        {/* Data Retention */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-orange-50 rounded-lg text-brand-coral">
                <History className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-medium text-neutral-900">Data Auto-Deletion</h3>
                <p className="text-sm text-neutral-500 mt-1 max-w-md">
                  Automatically delete chat history and browsing data after a set period.
                </p>
              </div>
            </div>
          </div>
          
          <div className="pl-14">
            <select 
              value={settings.dataRetentionDays}
              onChange={(e) => updateSettings({ dataRetentionDays: Number(e.target.value) })}
              className="w-full sm:w-64 p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-elegant-purple/20"
            >
              <option value={7}>After 7 days</option>
              <option value={30}>After 30 days</option>
              <option value={90}>After 90 days</option>
              <option value={-1}>Never delete</option>
            </select>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-red-50/50 p-6 rounded-xl border border-red-100 flex items-center justify-between"
        >
          <div className="flex items-start gap-4">
            <div className="p-2 bg-red-100 rounded-lg text-red-600">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-medium text-red-900">Delete Account</h3>
              <p className="text-sm text-red-600/80 mt-1 max-w-md">
                Permanently remove all your data, order history, and preferences.
                This action cannot be undone.
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">
            Delete
          </button>
        </motion.div>
      </div>
    </div>
  );
}
