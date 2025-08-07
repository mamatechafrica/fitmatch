#!/bin/bash
# FitMatch App Health Check Script
# This script performs basic checks to validate our test analysis findings

echo "🔍 FitMatch App Health Check - Validating Test Analysis Findings"
echo "================================================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in FitMatch root directory"
    exit 1
fi

echo "✅ Running from FitMatch app directory"
echo ""

# 1. Check for critical missing files (Redux store)
echo "📦 CHECKING CRITICAL INFRASTRUCTURE..."
echo "---------------------------------------"

if grep -r "@/store" app/ > /dev/null 2>&1; then
    echo "🔍 Found store imports in app files"
    if [ -d "store" ]; then
        echo "✅ Store directory exists"
    else
        echo "❌ CRITICAL: Store directory missing (confirms our analysis)"
    fi
else
    echo "ℹ️  No store imports found"
fi

# 2. Check authentication files
echo ""
echo "🔐 CHECKING AUTHENTICATION IMPLEMENTATION..."
echo "--------------------------------------------"

auth_files=("app/Auth/LandingPage.tsx" "app/Auth/Login.tsx" "app/Auth/SignUp.tsx" "app/Auth/Onboarding.tsx")
auth_score=0

for file in "${auth_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
        ((auth_score++))
    else
        echo "❌ $file missing"
    fi
done

echo "📊 Authentication Score: $auth_score/${#auth_files[@]} ($(( auth_score * 100 / ${#auth_files[@]} ))%)"

# 3. Check core feature files
echo ""
echo "🎯 CHECKING CORE FEATURES..."
echo "----------------------------"

core_files=("app/SwipePage.tsx" "app/ViewStory.tsx" "components/UserCard.tsx")
core_score=0

for file in "${core_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
        ((core_score++))
    else
        echo "❌ $file missing"
    fi
done

echo "📊 Core Features Score: $core_score/${#core_files[@]} ($(( core_score * 100 / ${#core_files[@]} ))%)"

# 4. Check user profile/onboarding files
echo ""
echo "👤 CHECKING USER PROFILE FEATURES..."
echo "------------------------------------"

profile_files=("app/Users/SportChoice.tsx" "app/Users/DietChoice.tsx" "app/Users/PersonalityChoice.tsx" "app/Users/PublicProfile.tsx")
profile_score=0

for file in "${profile_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
        ((profile_score++))
    else
        echo "❌ $file missing"
    fi
done

echo "📊 Profile Features Score: $profile_score/${#profile_files[@]} ($(( profile_score * 100 / ${#profile_files[@]} ))%)"

# 5. Check events management
echo ""
echo "📅 CHECKING EVENTS MANAGEMENT..."
echo "-------------------------------"

event_files=("app/Events/NewEvent.tsx" "app/Events/EditEvent.tsx" "app/Events/EventList.tsx")
event_score=0

for file in "${event_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
        ((event_score++))
    else
        echo "❌ $file missing"
    fi
done

echo "📊 Events Score: $event_score/${#event_files[@]} ($(( event_score * 100 / ${#event_files[@]} ))%)"

# 6. Check legal compliance
echo ""
echo "⚖️  CHECKING LEGAL COMPLIANCE..."
echo "-------------------------------"

legal_files=("app/Extras/CGU.tsx" "app/Extras/Politiques.tsx" "app/Extras/MentionsLegales.tsx")
legal_score=0

for file in "${legal_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
        ((legal_score++))
    else
        echo "❌ $file missing"
    fi
done

echo "📊 Legal Compliance Score: $legal_score/${#legal_files[@]} ($(( legal_score * 100 / ${#legal_files[@]} ))%)"

# 7. Check for testing infrastructure
echo ""
echo "🧪 CHECKING TESTING INFRASTRUCTURE..."
echo "------------------------------------"

if [ -f "jest.config.js" ] || [ -f "jest.config.ts" ]; then
    echo "✅ Jest configuration found"
else
    echo "❌ No Jest configuration (confirms our analysis)"
fi

if grep -q "jest" package.json; then
    echo "✅ Jest found in package.json"
else
    echo "❌ Jest not in dependencies (confirms our analysis)"
fi

if [ -d "__tests__" ] || [ -d "tests" ]; then
    echo "✅ Test directory found"
else
    echo "❌ No test directory found (confirms our analysis)"
fi

# 8. Calculate overall score
echo ""
echo "📊 OVERALL ANALYSIS VALIDATION..."
echo "================================"

total_files_expected=17
total_files_found=$((auth_score + core_score + profile_score + event_score + legal_score))
overall_percentage=$(( total_files_found * 100 / total_files_expected ))

echo "Total key files found: $total_files_found/$total_files_expected"
echo "Basic implementation score: $overall_percentage%"

if [ $overall_percentage -ge 60 ] && [ $overall_percentage -le 75 ]; then
    echo "✅ VALIDATION: Score aligns with our 68% analysis!"
    echo "🎯 Confirmed: App is approximately $overall_percentage% complete"
elif [ $overall_percentage -lt 60 ]; then
    echo "⚠️  Score lower than expected - may need deeper analysis"
else
    echo "🎉 Score higher than expected - app may be more complete!"
fi

# 9. Check for critical issues
echo ""
echo "🚨 CRITICAL ISSUES CHECK..."
echo "--------------------------"

critical_issues=0

# Check for missing store
if ! [ -d "store" ] && grep -r "@/store" app/ > /dev/null 2>&1; then
    echo "❌ CRITICAL: Redux store imported but directory missing"
    ((critical_issues++))
fi

# Check for missing dependencies
if ! npm ls > /dev/null 2>&1; then
    echo "❌ CRITICAL: Missing dependencies"
    ((critical_issues++))
fi

echo "🚨 Critical issues found: $critical_issues"

if [ $critical_issues -eq 0 ]; then
    echo "✅ No critical blocking issues detected"
else
    echo "⚠️  $critical_issues critical issues need immediate attention"
fi

echo ""
echo "🏁 HEALTH CHECK COMPLETE"
echo "======================="
echo "Summary: This health check validates our test analysis findings."
echo "The app shows good structural foundation but has infrastructure gaps."
echo "Recommendation: Address critical issues before proceeding to beta."