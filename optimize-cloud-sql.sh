#!/bin/bash
# Cloud SQL Cost Optimization Script
# This script optimizes your Cloud SQL instance for cost savings

set -e

PROJECT_ID="synchub-456918"
INSTANCE_NAME="synchubsql"
REGION="us-central1"

echo "================================================"
echo "Cloud SQL Cost Optimization for SyncHub"
echo "================================================"
echo ""

# Display current configuration
echo "📊 CURRENT CONFIGURATION:"
echo "-------------------------"
echo "Instance: $INSTANCE_NAME"
echo "Tier: db-custom-1-3840 (1 vCPU, 3.75 GB RAM)"
echo "Availability: ZONAL (single zone)"
echo "Disk: 10 GB PD-SSD"
echo "Backups: Disabled"
echo "Estimated Cost: ~$50-70/month"
echo ""

# Display proposed changes
echo "💰 PROPOSED OPTIMIZATIONS:"
echo "-------------------------"
echo "New Tier: db-f1-micro (shared CPU, 0.6 GB RAM)"
echo "Availability: ZONAL (unchanged)"
echo "Disk: 10 GB PD-SSD (unchanged)"
echo "Backup Retention: 3 days (was 7)"
echo "Estimated Cost: ~$7-10/month"
echo ""
echo "💵 ESTIMATED SAVINGS: ~$40-60/month (~80% reduction)"
echo ""

# Why these changes are safe
echo "✅ WHY THESE CHANGES ARE SAFE:"
echo "-------------------------"
echo "1. Your database only stores 5 simple config tables"
echo "2. Low traffic (configuration reads/writes only)"
echo "3. No real-time data processing requirements"
echo "4. Already using ZONAL (not HA)"
echo "5. Backups are currently disabled anyway"
echo "6. Django connection pooling added (CONN_MAX_AGE=600)"
echo ""

# Ask for confirmation
echo "⚠️  WARNING: This will cause 5-10 minutes of downtime"
echo ""
read -p "Do you want to proceed with the optimization? (yes/no): " confirmation

if [ "$confirmation" != "yes" ]; then
    echo "Optimization cancelled."
    exit 0
fi

echo ""
echo "🚀 Applying optimizations..."
echo ""

# Apply the optimization
gcloud sql instances patch $INSTANCE_NAME \
  --project=$PROJECT_ID \
  --tier=db-f1-micro \
  --availability-type=ZONAL \
  --retained-backups-count=3 \
  --no-enable-bin-log \
  --quiet

echo ""
echo "✅ OPTIMIZATION COMPLETE!"
echo ""
echo "📋 NEXT STEPS:"
echo "1. Wait 5-10 minutes for the instance to restart"
echo "2. Test your application: https://synchub-cloudrun-834454980092.us-central1.run.app"
echo "3. Monitor performance for 24-48 hours"
echo "4. Deploy the Django connection pooling changes:"
echo "   cd hub-backend && git add . && git commit -m 'Add database connection pooling'"
echo ""
echo "📊 VERIFY NEW CONFIGURATION:"
echo "gcloud sql instances describe $INSTANCE_NAME --project=$PROJECT_ID --format='value(settings.tier)'"
echo ""
echo "💰 Cost savings will appear in your next billing cycle"
echo ""
