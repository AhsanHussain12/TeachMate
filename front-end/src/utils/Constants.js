import SearchIcon from '@mui/icons-material/Search';
import AssignmentTurnedIn from '@mui/icons-material/AssignmentTurnedIn';
import GroupIcon from '@mui/icons-material/Group';
import UploadIcon from '@mui/icons-material/Upload';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const teacherSidebarConstants = {
    findGig :{    
        icon : SearchIcon,
        label: "Find GiGs",
        route: '/dashboard/teacher/find-gigs'
    },  
    appliedGig :{    
        icon : AssignmentTurnedIn,
        label:"Applied GiGs",
        route: '/dashboard/teacher/applied-gigs'
    },
    settings :{    
      route: '/dashboard/teacher/settings'
    },
    students:
    {    
      icon : GroupIcon,
      label:"Students",
      route: '/dashboard/teacher/students'
    }
};
const studentSidebarConstants = {
    postGig :{    
        icon : UploadIcon,
        label: "Post GiGs",
        route: '/dashboard/student/post-gig'
    },  
    myGig :{    
        icon : WorkIcon,
        label:"MY GiGs",
        route: '/dashboard/student/'   // since my gig is now landing page of dashboard
    },
    settings :{    
      route: '/dashboard/student/settings'
    },

    teachers:
    {    
      icon : GroupIcon,
      label:"Teachers",
      route: '/dashboard/student/teachers'
    }
};

const adminSidebarConstants = {
  AssignedGigs :{    
    icon : AssignmentTurnedInIcon,
    label: "AssignedGigs",
    route: '/dashboard/admin/assigned-gigs'
  },
  PendingGigs :{    
    icon : HourglassEmptyIcon,
    label: "PendingGigs",
    route: '/dashboard/admin/pending-gigs'
  },
  Admins:{
    icon : PeopleIcon,
    label:"Admins",
    route: '/dashboard/admin/admin-members'
  },  
  ManageAdmins :{   
    icon : AdminPanelSettingsIcon,
    label:"ManageAdmins", 
    route: '/dashboard/admin/manage-admins'
  }
}


export {teacherSidebarConstants ,studentSidebarConstants,adminSidebarConstants};