# Azure Resources Setup Guide

This guide explains how to set up the required Azure resources for the GitHub Actions workflows.

## Prerequisites

1. Azure Account with active subscription
2. Azure CLI installed locally
3. GitHub repository with workflows

## Required Azure Resources

### 1. Azure App Service

```bash
# Login to Azure
az login

# Create resource group
az group create --name heavens-above-rg --location eastus

# Create App Service plan
az appservice plan create \
    --name heavens-above-plan \
    --resource-group heavens-above-rg \
    --sku F1 \
    --is-linux

# Create Web App
az webapp create \
    --name heavens-above \
    --resource-group heavens-above-rg \
    --plan heavens-above-plan \
    --runtime "NODE|18-lts"
```

### 2. Azure Storage Account

```bash
# Create storage account
az storage account create \
    --name heavensabovesa \
    --resource-group heavens-above-rg \
    --location eastus \
    --sku Standard_LRS

# Get storage connection string
az storage account show-connection-string \
    --name heavensabovesa \
    --resource-group heavens-above-rg
```

### 3. Application Insights

```bash
# Create Application Insights
az monitor app-insights component create \
    --app heavens-above-insights \
    --location eastus \
    --resource-group heavens-above-rg
```

## GitHub Secrets Setup

Add the following secrets to your GitHub repository:

1. AZURE_CREDENTIALS
```bash
az ad sp create-for-rbac --name "heavens-above-sp" \
    --role contributor \
    --scopes /subscriptions/{subscription-id}/resourceGroups/heavens-above-rg
```

2. AZURE_STORAGE_CONNECTION_STRING
```bash
# Use the connection string from storage account creation
```

3. AZURE_WEBAPP_NAME
```
heavens-above
```

## Branch Protection Rules

1. Go to repository Settings > Branches
2. Add rule for 'main' branch:
   - Require pull request reviews
   - Dismiss stale pull request approvals
   - Require status checks to pass
   - Require branches to be up to date
   - Include administrators

## Environment Setup

1. Go to repository Settings > Environments
2. Create 'staging' and 'production' environments
3. Add protection rules:
   - Required reviewers
   - Wait timer
   - Environment-specific secrets

## Monitoring Setup

1. Configure Application Insights in Azure Portal
2. Add monitoring widget to Azure Dashboard
3. Set up alerts for:
   - Failed deployments
   - High error rates
   - Performance degradation

## Backup Configuration

1. Create backup container in storage account:
```bash
az storage container create \
    --name backups \
    --connection-string $AZURE_STORAGE_CONNECTION_STRING
```

2. Configure backup retention policy:
```bash
az storage management-policy create \
    --account-name heavensabovesa \
    --resource-group heavens-above-rg \
    --policy @backup-policy.json
```

## Security Configuration

1. Enable Azure Security Center
2. Configure Azure Key Vault (optional):
```bash
az keyvault create \
    --name heavens-above-kv \
    --resource-group heavens-above-rg \
    --location eastus
```

## Testing the Setup

1. Push a change to trigger CI/CD:
```bash
git push origin main
```

2. Monitor in GitHub Actions tab
3. Verify deployment in Azure Portal
4. Check Application Insights for telemetry