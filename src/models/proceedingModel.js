const { model, Schema }=require('mongoose');
const Joi = require('joi');

const proceedingSchema = Schema({
    orphanFound: {type: Boolean, required: true, default: false},
    organization: {type: Schema.Types.ObjectId, ref: 'Organization'},
    orphan: {type: Schema.Types.ObjectId, ref: 'Orphan'},
    client: {type: Schema.Types.ObjectId, ref: "User"},
    consultant: {type: Schema.Types.ObjectId, ref: "User"},
    proceedingId: {type: Number, unique: true, required: true},
    preferredAge: Number,
    preferredGender: String,
    preferredReligion: String,
    currentPhase: {type: Number, default: 1},
    active: {type: Boolean, default: true},
    phases: {
        // adoption application + marriage + birth certificate + fee
        phase1: {
            applicationCheck: {type: Boolean, default: false},
            applicationLink: {type: String, default: "none",},
            birthCertificateCheck: {type: Boolean, default: false},
            birthCertificateLink: {type: String, default: "none"},
            marriageCertificateCheck: {type: Boolean, default: false},
            marriageCertificateLink: {type: String, default: "none"},
            feeCheck: {type: Boolean, default: false},
            approved: {type: Boolean, default: false},
            },
        // statement of purpose + proof of residence
        phase2: {  
            statementOfPurposeCheck: {type: Boolean, default: false},
            statementOfPurposeLink: {type: String, default: "none"},
            proofOfResidenceCheck: {type: Boolean, default: false},
            proofOfResidenceLink: {type: String, default: "none"},
            approved: {type: Boolean, default: false},
            }, 
        // health reports + bank statement
        phase3: {
            healthCheckUpReportCheck: {type: Boolean, default: false},
            healthCheckUpReportLink: {type: String, default: "none"},
            BankStatementCheck: {type: Boolean, default: false},
            BankStatementLink: {type: String, default: "none"},
            approved: {type: Boolean, default: false},
        },
        // document of referrals from 3 people
        phase4: {
            referralDocument1Check: {type: Boolean, default: false},
            referralDocument1Link: {type: String, default: "none"},
            referralDocument2Check: {type: Boolean, default: false},
            referralDocument2Link: {type: String, default: "none"},
            referralDocument3Check: {type: Boolean, default: false},
            referralDocument3Link: {type: String, default: "none"},
            emails: [String],
            approved: {type: Boolean, default: false},
        }, 
        // date of court hearings
        phase5: {
            hearing: [{name: {type:String, default: "Tentative Verdict"}, date: {type: Date, default: new Date(Date.now()).toISOString()}, venue: {type: String, default: "TBA"}, duration: {type: String, default: "TBA"}},
                    {name: {type:String, default: "Final Verdict"},  date: {type: Date, default: new Date(Date.now()).toISOString()}, venue: {type: String, default: "TBA"}, duration: {type: String, default: "TBA"}}],
            approved: {type: Boolean, default: false},
        },
    },
});
const Proceeding = model("Proceeding", proceedingSchema);

exports.Proceeding = Proceeding;
exports.proceedingSchema = proceedingSchema;