

## Feature Flags Management Section for Admin Dashboard

### Overview
Add a new "Feature Flags" sidebar section (admin-only) that fetches from the `feature_flags` table and lets admins toggle Cloud Run services on/off in real time.

### Changes

**1. Update `src/components/metrics/MetricsSidebar.tsx`**
- Add `'feature-flags'` to the `SectionType` union
- Add a new sidebar menu item: `{ id: 'feature-flags', label: 'Feature Flags', icon: ToggleRight, adminOnly: true }`

**2. Create `src/components/metrics/sections/FeatureFlagsSection.tsx`**
- New component that:
  - Fetches all rows from `feature_flags` table via Supabase client
  - Displays each flag as a Card with the flag name (formatted nicely), description, and a Switch toggle
  - On toggle, updates the `enabled` column and `updated_at` timestamp via Supabase
  - Shows a toast on success/error
  - Shows loading skeletons while fetching
  - Displays a "Cloud Run" badge/icon to visually group these as backend services
  - Shows last updated timestamp per flag

**3. Update `src/pages/Metrics.tsx`**
- Import `FeatureFlagsSection`
- Add a `case 'feature-flags'` to `renderContent()` switch

### Technical Details

**Data flow:**
- Read: `supabase.from('feature_flags').select('*').order('name')`
- Update: `supabase.from('feature_flags').update({ enabled, updated_at: new Date().toISOString() }).eq('id', flag.id)`
- Uses React Query with `queryKey: ['feature-flags']` and invalidation on mutation

**UI layout for each flag:**
```text
+--------------------------------------------------+
| Cloud Run Push Notifications              [ON/OFF]|
| Route push notifications through Cloud Run        |
| APNs/FCM service                                  |
| Last updated: 2 minutes ago                       |
+--------------------------------------------------+
```

**Flag name formatting:** `cloud_run_push_notifications` becomes `Cloud Run Push Notifications` (split on underscore, capitalize each word).

**Security:** Only shown to admin users (sidebar item has `adminOnly: true`, same pattern as Campaigns/Beacons/Reports). RLS on the table should restrict writes to authenticated admins.

