var express = require('express');
var app = express();
var path = require('path');
const fs = require("fs");
const inliner = require('./inliner');

app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

const testAssignments = {
  adminActiveCommunityReport: {
    constant: "ADMIN_ACTIVE_COMMUNITY_REPORT_TEMPLATE",
    test: "admin-active-community-report",
    keys: {
      "production": {
        "version": "6588bb90-6ad5-454d-8040-7f27e0de2048",
        "template": "d-f8458ee08cb54001aa530f6a5d4874a7"
      }
    }
  },

  adminCommunityCreated: {
    constant: "ADMIN_COMMUNITY_CREATED_TEMPLATE",
    test: "admin-community-created-notification",
    keys: {

      "production": {
        "version": "a76cccbc-97dc-4144-a9d8-3dd57f8dc7d1",
        "template": "d-a7087be1226d4ea88aa9a48db1e286fd"
      }
    }
  },

  adminSlackImportProcessed: {
    constant: "ADMIN_SLACK_IMPORT_PROCESSED_TEMPLATE",
    test: "admin-slack-import-completed",
    keys: {
      "production": {
        "version": "2632eb22-0b4c-4852-9f8d-44d936c0481c",
        "template": "d-80e4bcfafff548dc9f4bbe4453b393de"
      }
    }
  },

  adminToxicContent: {
    constant: "ADMIN_TOXIC_MESSAGE_TEMPLATE",
    test: "admin-toxic-content",
    keys: {
      "production": {
        "version": "fee0703f-fd62-4d9d-88db-8c26b6786ab9",
        "template": "d-5cb8a34555d0497c8093dbace5a1f0d1"
      }
    }
  },

  adminUserReported: {
    constant: "ADMIN_USER_REPORTED_TEMPLATE",
    test: "admin-user-reported-alert",
    keys: {
      "production": {
        "version": "1af007aa-a4f6-402f-b237-42aaff8a4fec",
        "template": "d-2610f4efe7cc435486f91eaaea2de9bc"
      }
    }
  },

  adminUserSpammingThreadsNotification: {
    constant: "ADMIN_USER_SPAMMING_THREADS_NOTIFICATION_TEMPLATE",
    test: "admin-user-spamming-threads-alert",
    keys: {
      "production": {
        "version": "213cb744-de6e-40d8-9ccf-0e49101ae37f",
        "template": "d-51bb58e9db4840a9a4815c33af861123"
      }
    }
  },

  communityInvite: {
    constant: "COMMUNITY_INVITE_TEMPLATE",
    test: "community-invitation",
    keys: {
      "test": {
        "version": "01d4b296-6198-460a-a38b-233d7b913084",
        "template": "d-5d52175477b74997b2ae229a51f92dce"
      },
      "production": {
        "version": "01d4b296-6198-460a-a38b-233d7b913084",
        "template": "d-5d52175477b74997b2ae229a51f92dce"
      }
    }
  },

  mentionInMessage: {
    constant: "NEW_MENTION_MESSAGE_TEMPLATE",
    test: "mention-in-message",
    keys: {
      "test": {
        "version": "d13180ce-91b7-4dc2-94e7-39b5dbdd3082",
        "template": "d-798f75bcfc424ea797aeecf1bf788879"
      },
      "production": {
        "version": "d13180ce-91b7-4dc2-94e7-39b5dbdd3082",
        "template": "d-798f75bcfc424ea797aeecf1bf788879"
      }
    }
  },

  mentionInThread: {
    constant: "NEW_MENTION_THREAD_TEMPLATE",
    test: "mention-in-thread",
    keys: {
      "test": {
        "version": "dfa1ace4-3245-4de4-ad1d-43b7eba156d2",
        "template": "d-ad36bf63f0e447ae8ae2681f5eb14418"
      },
      "production": {
        "version": "dfa1ace4-3245-4de4-ad1d-43b7eba156d2",
        "template": "d-ad36bf63f0e447ae8ae2681f5eb14418"
      }
    }
  },

  newCommunityWelcome: {
    constant: "NEW_COMMUNITY_WELCOME_TEMPLATE",
    test: "community-created",
    keys: {
      "test": {
        "version": "82428254-8808-4095-be7b-ee6b3c9648bd",
        "template": "d-14d97a348c4445fd8d58fac72ab9c48c"
      },
      "production": {
        "version": "82428254-8808-4095-be7b-ee6b3c9648bd",
        "template": "d-14d97a348c4445fd8d58fac72ab9c48c"
      }
    }
  },

  newDirectMessage: {
    constant: "NEW_DIRECT_MESSAGE_TEMPLATE",
    test: "direct-message-received",
    keys: {
      "test": {
        "version": "1e4efca9-2d08-4827-b87e-f5a345c2bc5b",
        "template": "d-f2e518b1bf4347478bfe62bebcdcb85f"
      },
      "production": {
        "version": "1e4efca9-2d08-4827-b87e-f5a345c2bc5b",
        "template": "d-f2e518b1bf4347478bfe62bebcdcb85f"
      }
    }
  },

  newRepliesInThreads: {
    constant: "NEW_MESSAGE_TEMPLATE",
    test: "message-in-threads",
    keys: {
      "test": {
        "version": "d00da7be-d810-479e-9ec4-fb177615c9ad",
        "template": "d-f15036fd5a9f4cf897ac31b324d6b583"
      },
      "production": {
        "version": "d00da7be-d810-479e-9ec4-fb177615c9ad",
        "template": "d-f15036fd5a9f4cf897ac31b324d6b583"
      }
    }
  },

  newThreadNotification: {
    constant: "NEW_THREAD_CREATED_TEMPLATE",
    test: "thread-created",
    keys: {
      "test": {
        "version": "78643f0e-8f20-443b-b69c-ad8a261c414c",
        "template": "d-9d3821120b054f83a6772db2091ce718"
      },
      "production": {
        "version": "78643f0e-8f20-443b-b69c-ad8a261c414c",
        "template": "d-9d3821120b054f83a6772db2091ce718"
      }
    }
  },

  newUserWelcome: {
    constant: "NEW_USER_WELCOME_TEMPLATE",
    test: "new-user-welcome",
    keys: {
      "test": {
        "version": "52eda517-3925-4b73-806f-d4e2a5449f9a",
        "template": "d-584544303d44469081181d96e66146a9"
      },
      "production": {
        "version": "52eda517-3925-4b73-806f-d4e2a5449f9a",
        "template": "d-584544303d44469081181d96e66146a9"
      }
    }
  },

  privateChannelRequestApproved: {
    constant: "PRIVATE_CHANNEL_REQUEST_APPROVED_TEMPLATE",
    test: "private-channel-request-approved",
    keys: {
      "test": {
        "version": "e12ab6f5-9d04-4d9c-993d-4382c6509c80",
        "template": "d-42f319a0d18c474c8e7cdb6ad01304f0"
      },
      "production": {
        "version": "e12ab6f5-9d04-4d9c-993d-4382c6509c80",
        "template": "d-42f319a0d18c474c8e7cdb6ad01304f0"
      }
    }
  },

  privateChannelRequestSent: {
    constant: "PRIVATE_CHANNEL_REQUEST_SENT_TEMPLATE",
    test: "private-channel-request-sent",
    keys: {
      "test": {
        "version": "f8bfaa59-8e08-439f-be0b-b3ec71b40158",
        "template": "d-1d863d2d96844fd49fae8429f09c3ee6"
      },
      "production": {
        "version": "f8bfaa59-8e08-439f-be0b-b3ec71b40158",
        "template": "d-1d863d2d96844fd49fae8429f09c3ee6"
      }
    }
  },

  privateCommunityRequestApproved: {
    constant: "PRIVATE_COMMUNITY_REQUEST_APPROVED_TEMPLATE",
    test: "private-community-request-approved",
    keys: {
      "test": {
        "version": "2619f1f6-b22d-4345-b59f-cdc3f111cddd",
        "template": "d-7f4e67e918d14e73962249825b1faf1a"
      },
      "production": {
        "version": "2619f1f6-b22d-4345-b59f-cdc3f111cddd",
        "template": "d-7f4e67e918d14e73962249825b1faf1a"
      }
    }
  },

  privateCommunityRequestSent: {
    constant: "PRIVATE_COMMUNITY_REQUEST_SENT_TEMPLATE",
    test: "private-community-request-sent",
    keys: {
      "test": {
        "version": "74831f98-5144-4b2a-9f12-fc33f5e01d27",
        "template": "d-025124979b234781abcfb188bed745b6"
      },
      "production": {
        "version": "74831f98-5144-4b2a-9f12-fc33f5e01d27",
        "template": "d-025124979b234781abcfb188bed745b6"
      }
    }
  },

  "validate-community-administrator-email": {
    constant: "ADMINISTRATOR_EMAIL_VALIDATION_TEMPLATE",
    test: "community-admin-email-validation",
    keys: {
      "test": {
        "version": "308723d0-eec0-4f02-8405-1989b80d759b",
        "template": "d-fcac6746dfab4f86b4bc2431d175df4b"
      },
      "production": {
        "version": "308723d0-eec0-4f02-8405-1989b80d759b",
        "template": "d-fcac6746dfab4f86b4bc2431d175df4b"
      }
    }
  },

  "validate-email": {
    constant: "EMAIL_VALIDATION_TEMPLATE",
    test: "user-email-validation",
    keys: {
      "test": {
        "version": "5662dde1-7255-44dd-a370-0cc1094d2c09",
        "template": "d-33485113347d4cda9da79df518a39efd"
      },
      "production": {
        "version": "5662dde1-7255-44dd-a370-0cc1094d2c09",
        "template": "d-33485113347d4cda9da79df518a39efd"
      }
    }
  },
  weeklyDigest: {
    constant: "DIGEST_TEMPLATE",
    test: "digest",
    keys: {
      "test": {
        "version": "69d92c4e-6c15-4e5d-9d2b-db73286ee7fa",
        "template": "d-78ae950412844f049c9a52cf753b7927"
      },
      "production": {
        "version": "69d92c4e-6c15-4e5d-9d2b-db73286ee7fa",
        "template": "d-78ae950412844f049c9a52cf753b7927"
      }
    }
  }
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
  const {
    fileName
  } = req.params;
  res.render(fileName, getAssignmentData(fileName));
});

app.listen(4000);