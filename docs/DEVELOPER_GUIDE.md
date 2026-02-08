# HaiLan (海蓝) Developer Guide

## Project Overview
HaiLan is a high-end private health management PWA focused on privacy and zero-knowledge proof verification of medical records.

### Core Tech Stack
- **Frontend:** React 18.2, Vite, Tailwind CSS v4
- **Backend:** Supabase (PostgreSQL, Auth, Storage)
- **Cryptography:** Zero-Knowledge Proofs (snarkjs/circom), Client-side Encryption (AES-GCM)

## Architecture

### "Zero-Knowledge Medical Vault"
The core feature allows users to store medical records that are encrypted client-side. The server (Supabase) never sees the raw data.

1.  **Encryption (AddRecordDialog):**
    - Data is encrypted in the browser using a user-derived key.
    - Encrypted blob is sent to Supabase `medical_records` table.

2.  **Decryption (RecordDetailDialog):**
    - Encrypted data is fetched.
    - Decrypted locally using the user's key.

3.  **Verification (ZKProofDialog):**
    - Generates a ZK proof to verify health metrics (e.g., "Blood pressure is normal") without revealing the exact values.

## File Structure
- `/src/app/App.tsx`: Main entry point and routing.
- `/src/app/components`: React components.
    - `AddRecordDialog.tsx`: Encrypted data entry.
    - `RecordDetailDialog.tsx`: Decrypted data view.
    - `ZKProofDialog.tsx`: Zero-knowledge proof generation.
- `/src/lib/supabase.ts`: Supabase client configuration.

## Supabase Schema
**Table: `medical_records`**
- `id`: UUID (Primary Key)
- `user_id`: UUID (Foreign Key to auth.users)
- `encrypted_data`: Text (Base64 encoded encrypted JSON)
- `iv`: Text (Initialization Vector)
- `created_at`: Timestamptz

## Development Workflow
1.  **Design Changes:** Update Figma file -> Copy Link to specific Frame -> Import to Figma Make.
2.  **Code Updates:** Figma Make updates React components.
3.  **Testing:** Verify encryption/decryption flows locally.
