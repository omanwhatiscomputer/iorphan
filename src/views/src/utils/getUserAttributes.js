const getUserAttributes = (userType) => {
    
    const defaultAttributes = ["__t", "_id", "dateCreated", "profilePhoto", "sex", "nationality", 
        "dateOfBirth", "address", "currency", "bankAccountNo", "mobileNo", "name", "email", "prefix", "blogPosts"];
    
    const clientAttributes = ["eligibility", "transactions", "creditCardNumber", "clientId", "isVolunteer", "hasVolunteered", 
        "totalDonated", "volunteeringAt", "blacklisted", "hasAdoptedBefore", "pastOrphans", "inProcessOfAdoption", "currentProceedings"];
    
    const managerAttributes = ["organization", "isAssigned"];
    const consultantAttributes = ["organization", "isAssigned", "proceedings"];
    const adminAttributes = ["adminId"];

    if (userType === "Client") return [...defaultAttributes, ...clientAttributes];
    else if(userType === "Consultant") return [...defaultAttributes, ...consultantAttributes];
    else if(userType === "Manager") return [...defaultAttributes, ...managerAttributes];
    else if(userType === "Admin") return [...defaultAttributes, ...adminAttributes];
    else throw new Error("Invalid userType exception.");
};

export default getUserAttributes;

