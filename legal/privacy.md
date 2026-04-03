# Privacy Policy

**MINE — by Offline Protocol, Inc.**

**Effective Date:** March 31, 2026
**Last Updated:** March 31, 2026

---

## 1. Introduction

Offline Protocol, Inc. ("Company", "we", "us", "our") operates the MINE mobile application ("App", "Service"), available on iOS (bundle identifier: com.offlineprotocol.mine) and Android (bundle identifier: com.offline.mine). This Privacy Policy describes how we collect, use, store, share, and protect your personal information when you use our Service.

MINE is a mesh relay mining and rewards application. Users earn points by running their device as a mesh relay node, completing location-based missions, participating in peer-to-peer mesh networking via Bluetooth Low Energy (BLE), connecting cryptocurrency wallets, and engaging with a gamified rewards system including leaderboards, streaks, and referrals.

We are committed to protecting your privacy and being transparent about our data practices. This policy is designed to comply with applicable data protection laws including the General Data Protection Regulation (GDPR), the California Consumer Privacy Act as amended by the California Privacy Rights Act (CCPA/CPRA), and other relevant privacy legislation worldwide.

By using MINE, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with our practices, please do not use the Service.

---

## 2. Information We Collect

### 2.1 Information You Provide Directly

| Data Type | Purpose | Storage Location |
|-----------|---------|-----------------|
| **Email address** | Account creation, authentication via OTP (OfflineID SDK), account recovery, deletion verification | Server-side (PostgreSQL) |
| **Username** | Unique public identifier (3-20 alphanumeric characters) | Server-side (PostgreSQL) |
| **Display name** (optional) | Shown to other users on your profile and in leaderboards | Server-side (PostgreSQL) |
| **Profile biography** (optional) | Self-description visible on your profile | Server-side (PostgreSQL) |
| **Profile picture** (optional) | Avatar image, encrypted before upload | Cloud object storage (Hetzner, EU), encrypted with AES-256-GCM |
| **Social links** (optional) | Links to X/Twitter, Telegram, Discord, personal website | Server-side (PostgreSQL, JSON) |
| **Wallet addresses** (optional) | Ethereum address (via Reown/WalletConnect) and/or Solana address (via Mobile Wallet Adapter) for blockchain interactions | On-device (expo-secure-store) and server-side (PostgreSQL) |
| **Referral code** | Unique code for inviting other users to the Service | Server-side (PostgreSQL) |

### 2.2 Information Collected Automatically

| Data Type | Purpose | Storage Location |
|-----------|---------|-----------------|
| **Device identifier** | Unique persistent device ID for push notification routing and session management | Server-side (PostgreSQL) and on-device |
| **Device model and OS version** | Compatibility, debugging, error diagnostics | Server-side (PostgreSQL) |
| **Platform** (iOS/Android) | Platform-specific service delivery and notification routing | Server-side (PostgreSQL) |
| **App version** | Feature compatibility, update prompts, error diagnostics | Server-side (PostgreSQL) |
| **Push notification tokens** | Delivering push notifications via FCM (Android) and APNs (iOS) | Server-side (PostgreSQL) |
| **IP address** | Rate limiting (1,000 API requests per 15 minutes per IP), fraud prevention | Server-side (limited retention, not permanently associated with your profile) |
| **GPS location** (foreground and background) | Required for geo-mission functionality, geofence calculations, zone entry detection | On-device only (AsyncStorage) — see Section 6 for full details |

### 2.3 Information Generated Through Use

| Data Type | Purpose | Storage Location |
|-----------|---------|-----------------|
| **Mining session data** | Start/stop timestamps, session duration, points earned per session | Server-side (PostgreSQL) |
| **Mission progress** | Completion status for daily, weekly, monthly, geo-based, and achievement missions | On-device (AsyncStorage) and server-side (PostgreSQL) |
| **Geofence zone entries** | Records of entering geo-mission zones (350m radius, grid-based cells of 0.006 degrees) | On-device (AsyncStorage) |
| **Points balance and level** | Cumulative points, current level, level progression | Server-side (PostgreSQL) |
| **Streak data** | Consecutive-day usage tracking for streak-based rewards | Server-side (PostgreSQL) |
| **Leaderboard position** | Ranking among other users based on points | Server-side (PostgreSQL, computed) |
| **Referral statistics** | Number of successful referrals, referral bonus earnings | Server-side (PostgreSQL) |
| **Mesh network metrics** | Peer count, transport type, signal strength, uptime, bytes transferred | On-device (AsyncStorage, chart history) |
| **BLE advertisements** | Device identifier, connection slot availability, battery level, uptime | Broadcast locally via Bluetooth — not stored server-side |

### 2.4 Blockchain and Cryptocurrency Data

If you choose to connect a cryptocurrency wallet:

- **Ethereum wallet**: Connected via Reown AppKit (WalletConnect protocol). Only your public wallet address is stored. Connection is user-initiated.
- **Solana wallet**: Connected via Mobile Wallet Adapter (available on Solana Seeker devices). Only your public Solana address is stored. Connection is user-initiated.
- **TokenVault interactions**: When you claim rewards, you sign transactions in your own wallet application. The App facilitates the transaction request but **never has access to your private keys**.
- **On-chain transactions**: Transaction history on public blockchains is inherently public and immutable. We do not control or have the ability to delete on-chain records.

**Important**: The App **never** accesses, stores, or transmits your private keys. Wallet signing occurs entirely within your chosen wallet application (e.g., MetaMask, Phantom, Saga wallet). We store only the public wallet address you choose to connect.

---

## 3. How We Use Your Information

### 3.1 Service Operation
- Creating and managing your account
- Authenticating your identity via email-based OTP codes (delivered through OfflineID SDK)
- Processing mining sessions and calculating points earned
- Tracking and validating mission completion (including geo-mission zone verification)
- Maintaining leaderboards and ranking systems
- Managing referral tracking and referral bonus distribution
- Routing push notifications to your device
- Enabling peer discovery and mesh networking via BLE
- Facilitating cryptocurrency wallet connections and vault claim transactions

### 3.2 Service Improvement
- Analyzing aggregate, anonymized usage patterns to improve features
- Diagnosing technical issues, crashes, and bugs via error tracking
- Monitoring service performance, reliability, and uptime
- Understanding mission completion rates and engagement patterns at an aggregate level

### 3.3 Safety and Security
- Detecting and preventing fraud, abuse, and unauthorized access
- Rate limiting authentication attempts (maximum 10 OTP requests per email per 24 hours; maximum 1,000 API requests per IP per 15 minutes)
- Enforcing anti-farming measures for geo-missions (8 geo-missions per day cap, 3 far-ring limit, 4-24 hour zone cooldowns)
- Verifying account deletion requests via OTP
- Enforcing our Terms of Service

### 3.4 Communication
- Sending authentication codes (OTP) via email (delivered by SendGrid)
- Sending account deletion verification codes via email
- Delivering push notifications for mining reminders, mission updates, and service announcements
- Essential service communications only — we do not send marketing emails

### 3.5 What We Do Not Use Your Information For

We do **not** use your information for:
- Selling to third parties
- Targeted advertising or behavioral advertising
- Profiling for marketing purposes
- Training artificial intelligence or machine learning models
- Sharing with data brokers
- Cross-context behavioral advertising

---

## 4. Data Storage and Encryption

### 4.1 On-Device Storage

| Storage Mechanism | Data Stored | Security |
|-------------------|-------------|----------|
| **expo-secure-store** | Authentication tokens (JWT), wallet addresses | iOS Keychain / Android Keystore encryption |
| **AsyncStorage** | User data cache, mission progress, mesh chart history, node location cache, biometric preference, onboarding state, geofence zone entries | Encrypted on-device storage |

### 4.2 Server-Side Storage
- **User account data**: Stored in PostgreSQL databases hosted on secured Railway infrastructure (United States).
- **Profile pictures**: Stored in Hetzner Cloud object storage (European Union). Images are encrypted client-side with AES-256-GCM (using a unique per-file key with a 12-byte initialization vector and authentication tag) before upload.
- **Authentication state**: OTP codes stored temporarily with automatic expiry (10 minutes for login OTP, 15 minutes for deletion verification OTP).
- **Social links and profile metadata**: Stored as JSON in PostgreSQL.

### 4.3 Encryption in Transit
- All communication between the App and our servers occurs over HTTPS/TLS. No unencrypted HTTP connections are permitted.
- API requests are authenticated using JWT tokens signed with RS256 (asymmetric RSA signing).
- BLE mesh networking supports MLS encryption for session-based peer communication.
- Media files (profile pictures) are encrypted client-side using AES-256-GCM before upload to cloud storage.

### 4.4 Authentication Security
- **JWT RS256**: Stateless authentication using asymmetric key signing. Tokens are stored in platform-native secure storage (iOS Keychain, Android Keystore).
- **Biometric authentication** (optional): Face ID, Touch ID (iOS), or Fingerprint (Android) can be enabled as an additional gate to access the App. Biometric data is processed entirely by your device's operating system and is never accessed or stored by MINE.
- **One-time passwords**: OTP codes are single-use and expire automatically after the designated period.

### 4.5 What We Cannot Access
- Private keys of any connected cryptocurrency wallet
- Wallet balances or transaction history beyond what is publicly available on the blockchain
- Your device's biometric data (Face ID, Touch ID, fingerprint templates)
- The encryption key for your expo-secure-store data (held only by your device's secure enclave)
- Your precise location when the App is terminated (background location is only active while the App is running)

---

## 5. Data Sharing and Third-Party Services

### 5.1 Third-Party Service Providers

We use the following third-party services to operate MINE:

| Service | Provider | Purpose | Data Shared | Provider Privacy Policy |
|---------|----------|---------|-------------|------------------------|
| **Firebase Cloud Messaging** | Google LLC | Push notification delivery (Android) | Device token, notification payload | [Google Privacy Policy](https://policies.google.com/privacy) |
| **Apple Push Notification service** | Apple Inc. | Push notification delivery (iOS) | Device token, notification payload | [Apple Privacy Policy](https://www.apple.com/legal/privacy/) |
| **PostHog** | PostHog Inc. | Product analytics | Anonymized events, masked session data, numeric user ID only | [PostHog Privacy Policy](https://posthog.com/privacy) |
| **Sentry** | Functional Software Inc. | Error tracking and crash reporting | Stack traces, device info, numeric user ID | [Sentry Privacy Policy](https://sentry.io/privacy/) |
| **Hetzner Cloud** | Hetzner Online GmbH | Object storage (profile pictures) | Encrypted image files only | [Hetzner Privacy Policy](https://www.hetzner.com/legal/privacy-policy/) |
| **Reown/WalletConnect** | Reown Inc. | Ethereum wallet connection protocol | Public wallet address (user-initiated) | [Reown Privacy Policy](https://reown.com/privacy-policy) |
| **Solana Mobile** | Solana Mobile Inc. | Solana wallet connection (Seeker devices) | Public Solana address (user-initiated) | [Solana Mobile Privacy Policy](https://solanamobile.com/privacy-policy) |
| **Mapbox** | Mapbox Inc. | Map tile rendering for geo-missions and network map | Map tile requests, geographic region, zoom level | [Mapbox Privacy Policy](https://www.mapbox.com/legal/privacy) |
| **SendGrid** | Twilio Inc. | Email delivery for OTP authentication codes | Email address, OTP code | [Twilio Privacy Policy](https://www.twilio.com/en-us/legal/privacy) |

### 5.2 Analytics Practices

We use PostHog for product analytics with the following privacy safeguards:
- **Session replay**: All text input fields are masked. All images are masked. We cannot read what you type or see your photos in session replays.
- **Events tracked**: High-level actions only (e.g., "mining session started", "mission completed", "profile updated"). We do not track granular personal details in analytics events.
- **Analytics is disabled** in development builds and only active in production.
- **User identification**: Users are identified by numeric ID only — not by email, username, or wallet address.

### 5.3 Error Tracking

We use Sentry for crash and error reporting. Error reports may include:
- Device model, OS version, app version, and platform
- Numeric user ID (not email, username, or wallet address)
- Stack traces and error messages
- Network request metadata (URLs, status codes — not request or response bodies)

### 5.4 Map Data

We use Mapbox for rendering maps in the geo-mission interface and network map. Mapbox receives:
- Map tile requests based on the geographic region and zoom level you are viewing
- Standard HTTP request metadata

Mapbox does **not** receive your user identity, account information, or mission data. Map tile requests are standard web requests that do not contain MINE-specific personal data.

### 5.5 We Do Not Share Data With
- Advertisers or advertising networks
- Data brokers or data resellers
- Social media platforms
- Government agencies (unless compelled by valid legal process — see Section 5.6)
- Any third party for the purpose of cross-context behavioral advertising

### 5.6 Legal Disclosure

We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court order, subpoena, or government agency with lawful authority). We will:
- Evaluate each request for legal validity before complying
- Narrow the scope of disclosure to the minimum required
- Notify you of such requests unless legally prohibited from doing so
- Oppose overly broad or legally deficient requests

---

## 6. Location Data

Location is a core component of MINE's geo-mission system. Due to its sensitivity, we provide this dedicated section.

### 6.1 How Location Is Used

MINE uses GPS location data to power geo-missions — location-based challenges that reward users for physically traveling to specific zones. The App uses:
- **High-accuracy GPS** via the expo-location library
- **Haversine distance calculations** to determine your proximity to mission zones
- **Geofence zones** with a 350-meter radius, organized in a grid-based system (0.006-degree cells)
- **Multi-ring mission zones**: Close (1-3 km), Medium (3-6 km), Far (6-10+ km)

### 6.2 Foreground and Background Location

- **Foreground location**: Collected when the App is open and in use, for real-time mission zone detection and map display.
- **Background location**: Collected when the App is running in the background, to detect geo-mission zone entries while you are traveling. Background location is **not** collected when the App is terminated/force-closed.

Both foreground and background location permissions are requested through standard iOS and Android permission dialogs. You may revoke these permissions at any time through your device settings, though this will disable geo-mission functionality.

### 6.3 Where Location Data Is Stored

**Location data is stored on your device only.** Specifically:
- Geofence zone entries and mission progress are stored in AsyncStorage on your device.
- Location coordinates are used for real-time calculations (distance to zones, zone entry detection) and are **not transmitted to our servers** during normal geo-mission usage.
- Location is **not sent to our server** unless you explicitly choose to add a location to your public profile.
- Location data is **never shared with third parties**.

### 6.4 Anti-Farming Protections

To maintain fairness and prevent abuse, the following limits apply to geo-missions:
- Maximum 8 geo-missions per day
- Maximum 3 far-ring missions per day
- Zone cooldown periods of 4 to 24 hours (a zone cannot be claimed again during cooldown)

These limits are enforced through on-device logic and server-side validation. They do not require additional data collection beyond what is described above.

### 6.5 Controlling Location Access

You can control location access at any time:
- **Revoke permissions**: Go to your device's Settings and revoke location permissions for MINE. This will disable geo-missions but all other App features will continue to function.
- **Background location**: You may grant foreground-only location access. This allows geo-missions only when the App is actively open.

---

## 7. Bluetooth and Mesh Networking Privacy

### 7.1 How Mesh Networking Works

When Bluetooth is enabled and mesh networking is active, your device:
- **Advertises** its presence to nearby devices using Bluetooth Low Energy (BLE) with a non-personal device identifier
- **Scans** for nearby MINE devices running the mesh protocol
- **Participates** in the mesh network as a relay node, contributing to network metrics (peer count, signal strength, uptime, data transferred)

### 7.2 What Is Broadcast via BLE

BLE advertisements contain:
- An application-specific service identifier
- Connection capacity (number of available connection slots)
- Battery level (percentage)
- Uptime (minutes since mesh activation)
- A device identifier (randomly generated, not linked to your name, email, username, or wallet address)

### 7.3 What Is Not Broadcast

BLE advertisements do **not** contain:
- Your name, email address, or username
- Your location coordinates
- Your wallet address or any financial information
- Your points balance, level, or mission data
- Any content you have entered into the App

### 7.4 Mesh Network Metrics

The App collects mesh network performance metrics (peer count, transport type, signal strength, uptime, bytes transferred) for display in the App's network map and mesh dashboard. These metrics are stored locally on your device (AsyncStorage) and are not transmitted to our servers.

### 7.5 Permissions Required

| Platform | Permissions | Purpose |
|----------|-------------|---------|
| **iOS** | NSBluetoothAlwaysUsageDescription | BLE scanning and advertising for mesh networking |
| **Android 12+** | BLUETOOTH_CONNECT, BLUETOOTH_SCAN, BLUETOOTH_ADVERTISE | BLE scanning, advertising, and peer connection |

### 7.6 Controlling Mesh Networking

You can disable mesh networking at any time by:
- Turning off Bluetooth in your device settings
- Revoking Bluetooth permissions for MINE in your device settings

Disabling Bluetooth will prevent mesh networking but will not affect other App functionality.

---

## 8. Device Permissions

MINE requests the following device permissions. All permissions can be managed through your device's settings at any time.

| Permission | Platform | Purpose | Required? |
|------------|----------|---------|-----------|
| **Location (foreground)** | iOS, Android | Geo-mission zone detection, map display | Required for geo-missions |
| **Location (background)** | iOS, Android | Geo-mission zone detection while App is backgrounded | Required for background geo-missions |
| **Bluetooth** | iOS, Android | BLE mesh networking, peer discovery, relay node operation | Required for mesh features |
| **Camera** | iOS, Android | Capturing profile picture | Optional |
| **Photo Library** | iOS, Android | Selecting profile picture from gallery | Optional |
| **Notifications** | iOS, Android | Push notifications for mining, missions, and announcements | Optional but recommended |
| **Biometric** (Face ID / Touch ID / Fingerprint) | iOS, Android | Optional App access gate for additional security | Optional |

Denying optional permissions will disable only the specific feature that requires it. Core App functionality (mining, missions via foreground location, points, leaderboard) will continue to work with only the required permissions.

---

## 9. Data Retention

| Data Type | Retention Period | Deletion Trigger |
|-----------|-----------------|------------------|
| **Account data** (email, username, display name, bio, social links) | Duration of account + 30-day deletion grace period | Account deletion request |
| **Profile picture** | Duration of account | Account deletion or picture replacement |
| **Mining session history** | Duration of account | Account deletion |
| **Points balance, level, streaks** | Duration of account | Account deletion |
| **Referral data** | Duration of account | Account deletion |
| **Leaderboard position** | Duration of account (recomputed dynamically) | Account deletion |
| **Wallet addresses** (server-side) | Duration of account | Account deletion or wallet disconnection |
| **Mission progress** (on-device) | Until App uninstall or data clear | User action (uninstall or clear storage) |
| **Geofence zone entries** (on-device) | Until App uninstall or data clear | User action |
| **Mesh chart history** (on-device) | Until App uninstall or data clear | User action |
| **Push notification tokens** | Duration of account | Account deletion or token refresh |
| **OTP codes** | 10 minutes (login) / 15 minutes (deletion verification) | Automatic expiry or single use |
| **Authentication tokens** (on-device) | Until logout or account deletion | Logout, account deletion, or token expiry |
| **IP addresses** | Limited retention for rate limiting and fraud prevention | Automated purge |
| **Analytics events** | Subject to PostHog's data retention policy | PostHog data lifecycle |
| **Error reports** | Subject to Sentry's data retention policy | Sentry data lifecycle |

---

## 10. Account Deletion

### 10.1 How to Delete Your Account

1. Open MINE and navigate to **Settings**
2. Select **"Delete Account"**
3. A verification OTP code will be sent to your registered email address
4. Enter the verification code to confirm deletion

### 10.2 Deletion Process

- Upon verified request, your account is immediately deactivated (your profile is hidden from other users, mining is halted)
- A **30-day grace period** begins, during which you may cancel the deletion by logging back in
- After 30 days, a scheduled process permanently deletes:
  - Your account record (email address)
  - Your profile data (username, display name, biography, social links)
  - Your wallet address associations
  - Your device tokens and push notification registrations
  - Your profile picture from Hetzner cloud storage
  - Your mining session records
  - Your referral records and statistics
  - Your points, level, and streak data
  - All associated database records (cascading deletion)

### 10.3 Data That Cannot Be Deleted

The following data cannot be removed upon account deletion:
- **On-chain transaction history**: Blockchain transactions (e.g., TokenVault claims) are recorded on public, immutable ledgers. We have no ability to modify or delete on-chain records.
- **Anonymized analytics data**: Usage data that has already been anonymized and aggregated in PostHog cannot be traced back to you and is not deleted.
- **Anonymized error reports**: Crash data in Sentry identified only by numeric ID, which is no longer linked to any account after deletion.
- **Data on your device**: On-device data (AsyncStorage, expo-secure-store) remains on your device until you uninstall the App or clear its storage. We cannot remotely delete on-device data.
- **Data required by law**: Any data we are legally required to retain under applicable law.

---

## 11. Your Rights

### 11.1 For All Users

Regardless of where you reside, you have the right to:
- **Access** your personal data through the App (profile, mining history, mission progress, wallet connections)
- **Correct** inaccurate information through your profile settings
- **Delete** your account and associated server-side data (see Section 10)
- **Withdraw consent** for optional permissions (Bluetooth, camera, photo library, notifications, biometric, background location) through your device settings at any time

### 11.2 For European Economic Area (EEA) Residents — GDPR Rights

Under the General Data Protection Regulation (EU) 2016/679, you additionally have the right to:
- **Data portability**: Request a copy of your personal data in a structured, commonly used, machine-readable format (e.g., JSON or CSV)
- **Restriction of processing**: Request that we limit how we use your data in certain circumstances
- **Object to processing**: Object to our processing of your data where we rely on legitimate interests as our legal basis
- **Erasure ("Right to be forgotten")**: Request deletion of your personal data, subject to the exceptions noted in Section 10.3
- **Lodge a complaint**: File a complaint with your local supervisory authority (Data Protection Authority)

**Legal basis for processing:**

| Processing Activity | Legal Basis |
|---------------------|-------------|
| Account creation and management | Performance of a contract (providing the Service) |
| Authentication (email OTP) | Performance of a contract |
| Mining session tracking | Performance of a contract |
| Mission tracking and rewards | Performance of a contract |
| Push notifications | Consent (you may opt out at any time) |
| Location data for geo-missions | Consent (you grant location permissions) |
| Bluetooth mesh networking | Consent (you grant Bluetooth permissions) |
| Product analytics (PostHog) | Legitimate interest (service improvement), with privacy safeguards |
| Error tracking (Sentry) | Legitimate interest (service reliability and bug resolution) |
| Fraud prevention and rate limiting | Legitimate interest (security) |
| Wallet connection | Consent (user-initiated connection) |

### 11.3 For California Residents — CCPA/CPRA Rights

Under the California Consumer Privacy Act, as amended by the California Privacy Rights Act, you have the right to:
- **Know** what personal information we collect, the sources of collection, the purposes for collection, and the categories of third parties with whom we share it
- **Access** the specific pieces of personal information we have collected about you
- **Delete** your personal information (subject to certain exceptions under CCPA Section 1798.105)
- **Correct** inaccurate personal information
- **Non-discrimination** for exercising your CCPA rights — we will not deny you the Service, charge different prices, or provide a different quality of service because you exercised your rights
- **Limit use of sensitive personal information**: Your precise geolocation is classified as sensitive personal information under CPRA. We use it solely for the disclosed purpose of geo-mission functionality and do not use it for profiling or advertising.

**Categories of personal information collected (CCPA categories):**

| CCPA Category | Examples from MINE | Sold? | Shared for Cross-Context Behavioral Advertising? |
|---------------|-------------------|-------|--------------------------------------------------|
| Identifiers | Email, username, device ID, IP address, wallet address | No | No |
| Geolocation data | GPS coordinates (on-device only) | No | No |
| Internet/electronic network activity | App usage events (anonymized), error reports | No | No |
| Inferences | Points balance, level, leaderboard ranking | No | No |

**We do not sell personal information.** We do not share personal information for cross-context behavioral advertising. We have not sold or shared personal information in the preceding 12 months.

### 11.4 For United Kingdom Residents — UK GDPR Rights

Under the UK General Data Protection Regulation and the Data Protection Act 2018, you have rights substantially similar to those described in Section 11.2 for EEA residents, including the rights of access, rectification, erasure, restriction, portability, and objection. You may lodge a complaint with the Information Commissioner's Office (ICO) at [ico.org.uk](https://ico.org.uk).

### 11.5 For Brazilian Residents — LGPD Rights

Under Brazil's Lei Geral de Protecao de Dados (LGPD), you have the right to confirmation of processing, access, correction, anonymization, portability, deletion of unnecessary data, information about sharing, and revocation of consent. You may contact the Autoridade Nacional de Protecao de Dados (ANPD) for complaints.

### 11.6 Exercising Your Rights

To exercise any of these rights, contact us at:

**Email:** privacy@offlineprotocol.com

We will respond to verified requests within:
- **30 days** for GDPR requests (extendable by 60 days for complex requests, with notification)
- **45 days** for CCPA requests (extendable by an additional 45 days, with notification)
- The timeframe required by other applicable law

We may request additional information to verify your identity before processing your request. We will not fulfill requests that we cannot verify.

---

## 12. Children's Privacy

The Service is not directed to children under the age of 13 (or the applicable minimum age in your jurisdiction, such as 16 in certain EEA member states). We do not knowingly collect personal information from children under 13.

If we become aware that a child under 13 has provided us with personal information, we will take steps to delete such information promptly and terminate the associated account.

If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately at privacy@offlineprotocol.com.

---

## 13. International Data Transfers

Your information may be transferred to and processed in countries other than the country in which you reside. Our infrastructure and service providers are located across multiple jurisdictions:

| Service / Infrastructure | Location | Data Processed |
|--------------------------|----------|----------------|
| **Application servers** (Railway) | United States | Account data, mining sessions, API requests |
| **Object storage** (Hetzner Cloud) | European Union (Germany) | Encrypted profile pictures |
| **Product analytics** (PostHog) | United States | Anonymized usage events |
| **Error tracking** (Sentry) | United States | Error reports, device metadata |
| **Push notifications** (Google FCM) | United States | Device tokens, notification payloads |
| **Push notifications** (Apple APNs) | United States | Device tokens, notification payloads |
| **Email delivery** (SendGrid) | United States | Email address, OTP codes |
| **Map tiles** (Mapbox CDN) | Various (global CDN) | Map tile requests |
| **Wallet protocol** (Reown) | Various | Public wallet address |

### 13.1 Safeguards for International Transfers

Where personal data is transferred outside the European Economic Area (EEA), the United Kingdom, or other jurisdictions with data transfer restrictions, we ensure appropriate safeguards are in place, including:
- **Standard Contractual Clauses (SCCs)** approved by the European Commission, where required
- **UK International Data Transfer Agreements** or UK Addendum to SCCs, where required
- **Data Processing Agreements** with all third-party service providers
- Transfers to countries recognized as providing adequate levels of data protection (adequacy decisions)

### 13.2 Your Consent to Transfers

By using the Service, you acknowledge that your information may be transferred to and processed in the jurisdictions listed above. If you are located in the EEA, UK, or another jurisdiction with data transfer restrictions, the legal basis for these transfers is the safeguards described in Section 13.1 or, where applicable, your explicit consent.

---

## 14. Security Measures

We implement comprehensive security measures to protect your data:

### 14.1 Encryption
- **In transit**: All network communications use TLS/HTTPS. No unencrypted HTTP connections are permitted.
- **At rest (server)**: Database-level encryption for PostgreSQL. Profile pictures encrypted with AES-256-GCM client-side before upload.
- **At rest (device)**: Authentication tokens in platform secure storage (iOS Keychain, Android Keystore). Application data in AsyncStorage.
- **Mesh networking**: BLE mesh communications support MLS encryption for session-based peer communication.

### 14.2 Authentication and Access Control
- **JWT RS256**: Stateless authentication using asymmetric RSA key signing
- **Biometric gate** (optional): Face ID, Touch ID, or Android Fingerprint as an additional access barrier
- **One-time passwords**: Single-use, time-limited OTP codes for authentication and sensitive operations
- **Rate limiting**: 1,000 API requests per 15 minutes per IP address; 10 OTP requests per 24 hours per email address

### 14.3 Infrastructure Security
- Server infrastructure hosted on Railway with standard security controls
- Cloud object storage (Hetzner) with access restricted to authenticated, time-limited presigned URLs
- No direct database access from the public internet

### 14.4 Incident Response
In the event of a data breach that poses a risk to your rights and freedoms, we will:
- Notify affected users without undue delay (and within 72 hours for GDPR-covered incidents, where required)
- Notify the relevant supervisory authority as required by law
- Take immediate steps to contain and remediate the breach
- Document the breach, its effects, and remediation measures

---

## 15. Do Not Track Signals

Some web browsers transmit "Do Not Track" (DNT) signals. As MINE is a mobile application and does not track users across third-party websites, DNT signals are not applicable to our Service. We do not engage in cross-site tracking.

---

## 16. Cookie Policy

The MINE mobile application does not use cookies. Authentication is entirely token-based (JWT Bearer tokens stored in secure device storage) with no server-side sessions or browser cookies. If you access any of our web properties (such as offlineprotocol.com), a separate cookie notice will apply.

---

## 17. Third-Party Links and Services

The App may contain links to third-party websites or services, including:
- Social media platforms (X/Twitter, Telegram, Discord) linked from user profiles
- Cryptocurrency wallet applications (MetaMask, Phantom, etc.) for transaction signing
- Blockchain explorers for viewing on-chain transactions

We are not responsible for the privacy practices of third-party services. We encourage you to review the privacy policies of any third-party services you access through or in connection with MINE.

---

## 18. Changes to This Privacy Policy

We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of material changes by:
- Posting the updated policy within the App
- Updating the "Last Updated" date at the top of this policy
- Sending a push notification or email for significant changes that materially affect your rights

Your continued use of the Service after changes become effective constitutes acceptance of the revised policy. If you do not agree with any changes, you should stop using the Service and delete your account.

---

## 19. Contact Us

For privacy-related inquiries, data access requests, data portability requests, complaints, or any questions about this Privacy Policy:

**Offline Protocol, Inc.**
Email: privacy@offlineprotocol.com
Website: https://offlineprotocol.com

For EEA residents, you may also contact your local Data Protection Authority. A list of EEA Data Protection Authorities is available at [edpb.europa.eu](https://edpb.europa.eu/about-edpb/about-edpb/members_en).

For UK residents, you may contact the Information Commissioner's Office (ICO) at [ico.org.uk](https://ico.org.uk).

For California residents, you may contact the California Attorney General's Office at [oag.ca.gov](https://oag.ca.gov).

---

## 20. Supplemental Disclosures

### 20.1 Nevada Residents
We do not sell your personal information as defined under Nevada Revised Statutes Chapter 603A. If you are a Nevada resident and wish to submit a verified request directing us not to sell your personal information, please contact us at privacy@offlineprotocol.com.

### 20.2 Virginia, Colorado, Connecticut, and Other US State Privacy Laws
Residents of states with comprehensive consumer privacy laws (including Virginia's CDPA, Colorado's CPA, and Connecticut's CTDPA) have rights similar to those described in Section 11.3, including the rights to access, delete, correct, and opt out of targeted advertising and the sale of personal data. We do not sell personal data or engage in targeted advertising. To exercise your rights, contact us at privacy@offlineprotocol.com.

### 20.3 Canadian Residents
We comply with Canada's Personal Information Protection and Electronic Documents Act (PIPEDA) and applicable provincial privacy legislation. You have the right to access your personal information, request correction, and withdraw consent for non-essential processing. Contact us at privacy@offlineprotocol.com.

---

*By using MINE, you acknowledge that you have read and understood this Privacy Policy.*
