/**
 * WebAuthn Service
 * Handles authenticators registration and authentication using the WebAuthn API.
 */

export const WebAuthnService = {
  /**
   * Check if WebAuthn is supported on the current device.
   */
  isSupported() {
    return (
      window.PublicKeyCredential &&
      typeof window.PublicKeyCredential === 'function' &&
      !!window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable
    );
  },

  /**
   * Check if a platform authenticator (like FaceID, TouchID, or Windows Hello) is available.
   */
  async isPlatformAuthenticatorAvailable() {
    if (!this.isSupported()) return false;
    return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
  },

  /**
   * Register a new biometric credential.
   */
  async registerCredential(username: string = 'User') {
    if (!this.isSupported()) {
      throw new Error('WebAuthn is not supported on this browser.');
    }

    // In a real implementation, the challenge and user ID would come from the server.
    const challenge = crypto.getRandomValues(new Uint8Array(32));
    const userId = crypto.getRandomValues(new Uint8Array(16));

    const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
      challenge,
      rp: {
        name: "海蓝 HaiLan Health",
        id: window.location.hostname === 'localhost' ? undefined : window.location.hostname,
      },
      user: {
        id: userId,
        name: username,
        displayName: username,
      },
      pubKeyCredParams: [
        { alg: -7, type: "public-key" }, // ES256
        { alg: -257, type: "public-key" }, // RS256
      ],
      authenticatorSelection: {
        authenticatorAttachment: "platform",
        userVerification: "required",
        residentKey: "required",
      },
      timeout: 60000,
      attestation: "none",
    };

    try {
      const credential = await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions,
      }) as any;
      
      // Save device metadata locally for management UI demo
      if (credential) {
        this.addDevice({
          id: credential.id,
          name: `${navigator.platform || '移动设备'} - ${new Date().toLocaleDateString()}`,
          lastUsed: new Date().toISOString(),
          type: 'Platform Authenticator'
        });
      }
      
      return credential;
    } catch (error) {
      console.error('[WebAuthn] Registration failed:', error);
      throw error;
    }
  },

  /**
   * Device Management Methods (Simulated)
   */
  getDevices() {
    const devices = localStorage.getItem('hailan_auth_devices');
    return devices ? JSON.parse(devices) : [
      // Default mock device if none registered
      { id: 'dev-001', name: 'iPhone 15 Pro (当前设备)', lastUsed: new Date().toISOString(), type: 'FaceID' }
    ];
  },

  addDevice(device: { id: string, name: string, lastUsed: string, type: string }) {
    const devices = this.getDevices();
    devices.push(device);
    localStorage.setItem('hailan_auth_devices', JSON.stringify(devices));
  },

  revokeDevice(id: string) {
    const devices = this.getDevices();
    const filtered = devices.filter((d: any) => d.id !== id);
    localStorage.setItem('hailan_auth_devices', JSON.stringify(filtered));
  },

  /**
   * Authenticate using an existing biometric credential.
   */
  async authenticate() {
    if (!this.isSupported()) {
      throw new Error('WebAuthn is not supported on this browser.');
    }

    const challenge = crypto.getRandomValues(new Uint8Array(32));

    const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions = {
      challenge,
      allowCredentials: [], // Empty means let the browser decide
      userVerification: "required",
      timeout: 60000,
    };

    try {
      const assertion = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions,
      });
      
      return assertion;
    } catch (error) {
      console.error('[WebAuthn] Authentication failed:', error);
      throw error;
    }
  }
};
