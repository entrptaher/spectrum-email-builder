var express = require('express');
var app = express();
var path = require('path');
const fs = require("fs");
const inliner = require('./inliner');

app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

const testAssignments = {
  adminActiveCommunityReport: { constant: "ADMIN_ACTIVE_COMMUNITY_REPORT_TEMPLATE", test: "" },
  adminCommunityCreated: { constant: "ADMIN_COMMUNITY_CREATED_TEMPLATE", test: "" },
  adminSlackImportProcessed: { constant: "ADMIN_SLACK_IMPORT_PROCESSED_TEMPLATE", test: "" },
  adminToxicContent: { constant: "ADMIN_TOXIC_MESSAGE_TEMPLATE", test: "" },
  adminUserReported: { constant: "ADMIN_USER_REPORTED_TEMPLATE", test: "" },
  adminUserSpammingThreadsNotification: { constant: "ADMIN_USER_SPAMMING_THREADS_NOTIFICATION_TEMPLATE", test: "" },
  communityInvite: { constant: "COMMUNITY_INVITE_TEMPLATE", test: "" },
  mentionInMessage: { constant: "NEW_MENTION_MESSAGE_TEMPLATE", test: "mention-in-message" },
  mentionInThread: { constant: "NEW_MENTION_THREAD_TEMPLATE", test: "" },
  newCommunityWelcome: { constant: "NEW_COMMUNITY_WELCOME_TEMPLATE", test: "" },
  newDirectMessage: { constant: "NEW_DIRECT_MESSAGE_TEMPLATE", test: "" },
  newRepliesInThreads: { constant: "NEW_MESSAGE_TEMPLATE", test: "" },
  newThreadNotification: { constant: "NEW_THREAD_CREATED_TEMPLATE", test: "" },
  newUserWelcome: { constant: "NEW_USER_WELCOME_TEMPLATE", test: "" },
  privateChannelRequestApproved: { constant: "PRIVATE_CHANNEL_REQUEST_APPROVED_TEMPLATE", test: "" },
  privateChannelRequestSent: { constant: "PRIVATE_CHANNEL_REQUEST_SENT_TEMPLATE", test: "" },
  privateCommunityRequestApproved: { constant: "PRIVATE_COMMUNITY_REQUEST_APPROVED_TEMPLATE", test: "" },
  privateCommunityRequestSent: { constant: "PRIVATE_COMMUNITY_REQUEST_SENT_TEMPLATE", test: "" },
  "validate-community-administrator-email": { constant: "ADMINISTRATOR_EMAIL_VALIDATION_TEMPLATE", test: "" },
  "validate-email": { constant: "EMAIL_VALIDATION_TEMPLATE", test: "" },
  weeklyDigest: { constant: "DIGEST_TEMPLATE", test: "" }
}

for (let fileName of Object.keys(testAssignments)) {
  inliner(`${fileName}.html`)
}

function getAssignmentData(fileName) {
  const path = `./test-email-data/${testAssignments[fileName].test}.json`;
  const rawData = fs.readFileSync(path);
  return JSON.parse(rawData);
}

app.get('/:fileName', function (req, res) {
  const { fileName } = req.params;
  res.render(fileName, getAssignmentData(fileName));
});

app.listen(4000);