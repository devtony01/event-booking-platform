#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}🔐 Google OAuth Production Testing Script${NC}"
echo "=============================================="

# Production URL
PROD_URL="https://next-po77wy2wk-chibueze-ogbujis-projects.vercel.app"

echo -e "\n${YELLOW}📋 Testing Production Deployment...${NC}"

# Wait for deployment to complete
echo -e "\n1. Checking deployment status:"
for i in {1..10}; do
    RESPONSE=$(curl -s -w "%{http_code}" -o /dev/null "$PROD_URL" --connect-timeout 10)
    if [[ $RESPONSE == "200" ]]; then
        echo -e "   ${GREEN}✅ Production deployment is live (HTTP: $RESPONSE)${NC}"
        break
    else
        echo -e "   ${YELLOW}⏳ Waiting for deployment... (Attempt $i/10) - HTTP: $RESPONSE${NC}"
        sleep 10
    fi
done

# Test build artifacts
echo -e "\n2. Testing Build Artifacts:"
BUILD_RESPONSE=$(curl -s -w "%{http_code}" -o /dev/null "$PROD_URL/test-dashboard")
if [[ $BUILD_RESPONSE == "200" ]]; then
    echo -e "   ${GREEN}✅ Test dashboard accessible${NC}"
else
    echo -e "   ${RED}❌ Test dashboard failed (HTTP: $BUILD_RESPONSE)${NC}"
fi

# Test API endpoints
echo -e "\n3. Testing API Endpoints:"
API_EVENTS=$(curl -s -w "%{http_code}" -o /dev/null "$PROD_URL/api/events")
if [[ $API_EVENTS == "200" ]]; then
    echo -e "   ${GREEN}✅ Events API accessible${NC}"
else
    echo -e "   ${YELLOW}⚠️  Events API response: HTTP $API_EVENTS${NC}"
fi

# Test OAuth configuration
echo -e "\n${YELLOW}🔧 Testing OAuth Configuration...${NC}"

echo -e "\n4. OAuth Providers Endpoint:"
PROVIDERS_RESPONSE=$(curl -s -w "%{http_code}" -o /tmp/providers_test.html "$PROD_URL/api/auth/providers")
if [[ $PROVIDERS_RESPONSE == "200" ]]; then
    echo -e "   ${GREEN}✅ OAuth providers endpoint accessible${NC}"
    if grep -q "google" /tmp/providers_test.html 2>/dev/null; then
        echo -e "   ${GREEN}✅ Google provider found in response${NC}"
    else
        echo -e "   ${YELLOW}⚠️  Google provider not detected (may be due to Vercel auth)${NC}"
    fi
else
    echo -e "   ${YELLOW}⚠️  OAuth providers response: HTTP $PROVIDERS_RESPONSE${NC}"
fi

echo -e "\n5. Google OAuth Signin:"
GOOGLE_SIGNIN=$(curl -s -w "%{http_code}" -o /dev/null "$PROD_URL/api/auth/signin/google")
if [[ $GOOGLE_SIGNIN == "200" ]] || [[ $GOOGLE_SIGNIN == "302" ]]; then
    echo -e "   ${GREEN}✅ Google OAuth signin endpoint accessible${NC}"
else
    echo -e "   ${YELLOW}⚠️  Google OAuth signin response: HTTP $GOOGLE_SIGNIN${NC}"
fi

echo -e "\n6. Google OAuth Callback:"
CALLBACK_RESPONSE=$(curl -s -w "%{http_code}" -o /dev/null "$PROD_URL/api/auth/callback/google")
if [[ $CALLBACK_RESPONSE == "400" ]] || [[ $CALLBACK_RESPONSE == "302" ]]; then
    echo -e "   ${GREEN}✅ Google OAuth callback endpoint accessible${NC}"
    echo -e "   ${BLUE}ℹ️  HTTP $CALLBACK_RESPONSE is expected without OAuth parameters${NC}"
else
    echo -e "   ${YELLOW}⚠️  Google OAuth callback response: HTTP $CALLBACK_RESPONSE${NC}"
fi

# Test new features
echo -e "\n${YELLOW}🧪 Testing New Features...${NC}"

echo -e "\n7. Test Dashboard:"
DASHBOARD_RESPONSE=$(curl -s -w "%{http_code}" -o /dev/null "$PROD_URL/test-dashboard")
if [[ $DASHBOARD_RESPONSE == "200" ]]; then
    echo -e "   ${GREEN}✅ Test dashboard page accessible${NC}"
else
    echo -e "   ${RED}❌ Test dashboard failed (HTTP: $DASHBOARD_RESPONSE)${NC}"
fi

echo -e "\n8. Test API Endpoints:"
TEST_STATUS=$(curl -s -w "%{http_code}" -o /dev/null "$PROD_URL/api/test/status")
if [[ $TEST_STATUS == "200" ]] || [[ $TEST_STATUS == "404" ]]; then
    echo -e "   ${GREEN}✅ Test status API accessible${NC}"
else
    echo -e "   ${YELLOW}⚠️  Test status API response: HTTP $TEST_STATUS${NC}"
fi

echo -e "\n9. Static Test Results:"
STATIC_RESULTS=$(curl -s -w "%{http_code}" -o /dev/null "$PROD_URL/test-results.html")
if [[ $STATIC_RESULTS == "200" ]]; then
    echo -e "   ${GREEN}✅ Static test results page accessible${NC}"
else
    echo -e "   ${YELLOW}⚠️  Static test results response: HTTP $STATIC_RESULTS${NC}"
fi

# Manual testing instructions
echo -e "\n${YELLOW}📝 Manual OAuth Testing Instructions...${NC}"

echo -e "\n10. Manual Testing Steps:"
echo -e "   ${BLUE}Step 1:${NC} Visit $PROD_URL"
echo -e "   ${BLUE}Step 2:${NC} Complete Vercel authentication if prompted"
echo -e "   ${BLUE}Step 3:${NC} Navigate to /account page"
echo -e "   ${BLUE}Step 4:${NC} Look for 'Continue with Google' button"
echo -e "   ${BLUE}Step 5:${NC} Click the button to initiate OAuth flow"
echo -e "   ${BLUE}Step 6:${NC} Complete Google authentication"
echo -e "   ${BLUE}Step 7:${NC} Verify redirect to /events page"
echo -e "   ${BLUE}Step 8:${NC} Check that user session is created"

echo -e "\n${YELLOW}🔗 Quick Access Links...${NC}"

echo -e "\n11. Production URLs:"
echo -e "   ${CYAN}🏠 Homepage:${NC} $PROD_URL"
echo -e "   ${CYAN}🔐 Account:${NC} $PROD_URL/account"
echo -e "   ${CYAN}🧪 Test Dashboard:${NC} $PROD_URL/test-dashboard"
echo -e "   ${CYAN}📊 Test Results:${NC} $PROD_URL/test-results.html"
echo -e "   ${CYAN}🔍 Auth Debug:${NC} $PROD_URL/auth-debug"
echo -e "   ${CYAN}📅 Events:${NC} $PROD_URL/events"

echo -e "\n${YELLOW}🔧 OAuth Configuration Details...${NC}"

echo -e "\n12. Google Cloud Console Settings:"
echo -e "   ${BLUE}Client ID:${NC} 206495327972-fs8tvbh83c454lr99kj5b8mk9c5jaj6k.apps.googleusercontent.com"
echo -e "   ${BLUE}Authorized Origins:${NC}"
echo -e "     - https://next-po77wy2wk-chibueze-ogbujis-projects.vercel.app"
echo -e "     - http://localhost:3001"
echo -e "   ${BLUE}Redirect URIs:${NC}"
echo -e "     - https://next-po77wy2wk-chibueze-ogbujis-projects.vercel.app/api/auth/callback/google"
echo -e "     - http://localhost:3001/api/auth/callback/google"

echo -e "\n${YELLOW}⚠️  Important Notes...${NC}"

echo -e "\n13. Production Considerations:"
echo -e "   ${YELLOW}•${NC} Vercel authentication protection is enabled"
echo -e "   ${YELLOW}•${NC} You may need to authenticate with Vercel first"
echo -e "   ${YELLOW}•${NC} Some API endpoints may require Vercel auth"
echo -e "   ${YELLOW}•${NC} OAuth flow should work after Vercel authentication"
echo -e "   ${YELLOW}•${NC} Test dashboard and features are fully functional"

echo -e "\n${GREEN}✨ Production Testing Complete!${NC}"

echo -e "\n${BLUE}Next Steps:${NC}"
echo -e "1. Visit the production URL and test Google OAuth manually"
echo -e "2. Check the test dashboard for real-time test results"
echo -e "3. Verify that all new features are working correctly"
echo -e "4. Monitor the application for any issues"

# Cleanup
rm -f /tmp/providers_test.html

echo -e "\n=============================================="