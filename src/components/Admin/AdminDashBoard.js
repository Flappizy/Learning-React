import {BankAccessAdminHomepage} from './BankAccessAdminHomepage';
import {SuperAdminHomepage} from './SuperAdminHomePage';
import {EveryOtherAdminHomepage} from './EveryOtherAdminsHomePage';

const SUPER_ADMIN = "Super Admin";
const Bank_ACCESS_ADMIN = "Bank Access Control";

export const DashBoard = (adminRole) => {
    //const lowerCaseAdminRole = adminRole.toLowerCase();
    const isSuperAdmin = adminRole === SUPER_ADMIN;
    const isBankAccess = adminRole === Bank_ACCESS_ADMIN;

    return(
        <div>
        {
            isSuperAdmin ? <SuperAdminHomepage/> : <BankAccessAdminHomepage />
        }   
        </div> 
    )
};