
# Enhanced System Health Dashboard

## Overview
Expand the current BetterStack health component into a comprehensive monitoring dashboard that provides actionable insights across storage, performance, user activity, and error tracking.

## What You'll Get

### 1. Uptime and Response Times
- Current monitor status (already working)
- 24-hour response time trends per monitor with charts
- Availability percentages (e.g., "99.98% uptime this month")
- Recent incident history

### 2. Storage Metrics
- Database size: Currently 29 MB
- Storage bucket usage breakdown:
  - Videos: ~300 MB (19 files)
  - Ad Assets: ~52 MB (22 files)
  - Avatars: ~30 MB (16 files)
  - Business Images: ~14 MB (19 files)
  - Music Tracks: Empty
- Visual progress bars showing usage against limits

### 3. Performance Metrics
- Edge function execution times (from analytics)
- Database query response times
- API response latency distribution
- Slowest endpoints identification

### 4. User Activity
- Daily active users trend
- Total sessions and average duration
- Video completion rates
- Device type breakdown (mobile vs desktop)
- Page view analytics

### 5. Error Tracking
- Edge function error rates (4xx/5xx responses)
- Recent database errors from logs
- Auth failures and suspicious activity
- Error trends over time

---

## Technical Approach

### New Edge Function: `system-metrics`
Aggregates data from multiple sources:

```text
+------------------+     +-------------------+
|  BetterStack API |     | Supabase Database |
|  - Response times|     | - daily_analytics |
|  - Availability  |     | - page_views      |
|  - Incidents     |     | - user_sessions   |
+--------+---------+     | - storage.objects |
         |               +--------+----------+
         v                        v
    +-----------------------------+
    |   system-metrics function   |
    | (aggregates all sources)    |
    +-------------+---------------+
                  |
                  v
    +-----------------------------+
    |  Enhanced Dashboard UI      |
    | - Tabbed sections           |
    | - Charts & visualizations   |
    | - Auto-refresh every 60s    |
    +-----------------------------+
```

### API Calls to BetterStack
For each monitor, fetch:
- `/monitors/{id}/response-times` - Last 24h response times
- `/monitors/{id}/sla` - Availability percentage
- `/v3/incidents` - Recent incidents

### Database Queries
- Storage usage from `storage.objects`
- User metrics from `daily_analytics`
- Session data from `user_sessions`
- Table sizes for database growth tracking

### UI Component Structure
- Expandable sections with tabs for different metric categories
- Sparkline charts for trends (using existing Recharts)
- Color-coded indicators for health thresholds
- Collapsible detailed views

---

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `supabase/functions/system-metrics/index.ts` | Create | Aggregate all metrics from multiple sources |
| `src/components/SystemHealthDashboard.tsx` | Create | New comprehensive dashboard component |
| `src/components/health/StorageMetrics.tsx` | Create | Storage usage visualization |
| `src/components/health/PerformanceMetrics.tsx` | Create | Response times and latency |
| `src/components/health/UserActivityMetrics.tsx` | Create | User engagement stats |
| `src/components/health/ErrorTracking.tsx` | Create | Error rates and logs |
| `src/pages/Metrics.tsx` | Modify | Replace BetterStackHealth with new dashboard |
| `supabase/functions/betterstack-status/index.ts` | Modify | Add response times and availability calls |

---

## Data Refresh Strategy
- Core health status: Every 60 seconds (current behavior)
- Response times/availability: Every 5 minutes (API rate limits)
- User analytics: Every 5 minutes (database load)
- Storage metrics: Every 15 minutes (slower to change)

---

## Considerations
- BetterStack API rate limits (handled with caching in edge function)
- Storage size queries can be slow on large datasets
- May need additional BetterStack monitors for full coverage
- Dashboard will be admin-only (already in place)
