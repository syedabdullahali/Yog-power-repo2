import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilBook,
  cilCalculator,
  cilCash,
  cilCenterFocus,
  cilChartPie,
  cilChatBubble,
  cilContact,
  cilCursor,
  cilDescription,
  cilDrop,
  cilFolderOpen,
  cilGraph,
  cilGroup,
  cilNotes,
  cilPencil,
  cilPeople,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilUser,
  cilWeightlifitng,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    id:'crmDashboard',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },

  {
    component: CNavGroup,
    name: 'Employee',
    id:'crmEmployee',
    color: '#fff',
    to: '/employee',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: ' Dashboard',
        id:'crmDashboard1',
        to: '/employee/emp-dashboard',
      },
      {
        component: CNavItem,
        name: 'Employee Target',
        id:'crmEmployeeTarget1',
        to: '/employee/sales-target',
      },
         
          {
            component: CNavItem,
            name: 'Member Calls',
            id:'crmMemberCalls1',
            to: '/clients/service-call',
          },
          {
            component: CNavItem,
            name: 'Sales Call',
            id:'crmSalesCall1',
            to: '/clients/sales-call',
          },
          {
            component: CNavItem,
            id:'crmServicesRateCard1',
            name: 'Services Rate Card',
            to: '/clients/servicesrate-card',
          }
        
        ],
  },
  {
    component: CNavGroup,
    name: 'Trainer',
    id:'crmTrainer',
    to: '/trainer',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Live Classes',
        id:'crmLiveClasses1',
        to: '/trainer/live-classes'
      },
      {
        component: CNavItem,
        name: 'All Batches',
        id:'crmAllBatches1',
        to: '/trainer/all-batches',
        
      },
      {
        component: CNavItem,
        name: 'PT  Classes',
        id:'crmPtClasses1',
        to: '/trainer/pt-classes',
      },
      {
        component: CNavItem,
        id:'crmPtClasses1',
        name: 'TTC Classes',
        to: '/trainer/ttc-classes',
      },
      {
        component: CNavItem,
        name: 'ALL Members',
        id:'crmAllMembers1',
        to: '/trainer/all-members',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'CRM',
  },
  {
    component: CNavGroup,
    name: 'Leads',
    id:'crmLeads',
    to: '/leads',
    icon: <CIcon icon={cilFolderOpen} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Enquires',
        id:'crmAllEnquiry1',
        to: '/leads/all-enquires',
      },
      {
        component: CNavItem,
        name: 'Appointment',
        id:'crmAppointment1',
        to: '/leads/enquires-appointment',
      },
      {
        component: CNavItem,
        name: 'Trial Updated',
        id:'crmTrialUpdate1',
        to: '/leads/trial-updated',
      },
      {
        component: CNavItem,
        name: 'Prospects',
        id:'crmProspects1',
        to: '/leads/followups-scheduling',
      },
      {
        component: CNavItem,
        name: 'Calls Report',
        id:'crmCallsReports1',
        to: '/leads/followups-call-report',
      },
      {
        component: CNavItem,
        name: 'Cold Enquires',
        id:'crmColdEnquires1',
        to: '/leads/cold-enquires',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Client Management',
    id:'crmCientManagment',
    to: '/clients',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Clients',
        id:'crmAllClients1',
        to: '/clients/client-management/all-clients',
      },
      {
        component: CNavItem,
        name: 'Active Client',
        id:'crmActiveClients1',
        to: '/clients/client-management/active-clients',
      },
      {
        component: CNavItem,
        name: 'Renewals Client',
        id:'crmRenewalsClient1',
        to: '/clients/client-management/renewals-clients',
      },
      {
        component: CNavItem,
        name: 'Renewed Clients',
        id:'crmRenewedClients1',
        to: '/clients/client-management/renewed-clients',
      },
      {
        component: CNavItem,
        name: 'Left Clients',
        id:'crmLeftClients1',
        to: '/clients/client-management/left-clients',
      },
      {
        component: CNavItem,
        name: 'Client Support',
        id:'crmClientSupport1',
        to: '/clients/client-management/client-support',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Marketing',
    id:'crmMarketing',
    to: '/Marketing',
    icon: <CIcon icon={cilChatBubble} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'E-Mail Marketing',
        id:'crmEmailMarketing1',
        to: '/Marketing/email-marketing',
      },
      {
        component: CNavItem,
        name: 'SMS Marketing',
        id:'crmSmsMarketing1',
        to: '/Marketing/sms-marketing',
      },
      {
        component: CNavItem,
        name: 'Push Marketing',
        id:'crmPushMarketing1',
        to: '/Marketing/push-marketing',
      },
      {
        component: CNavItem,
        name: 'Offers Master',
        id:'crmOffersMaster1',
        to: '/Marketing/offers-master',
      },
      {
        component: CNavItem,
        name: 'Bulk Mailer Data',
        id:'crmBulkMailerData1',
        to: '/Marketing/bulk-mailer-data',
      },
      {
        component: CNavItem,
        name: 'Bulk Calling Data',
        id:'crmBulkCallingData1',
        to: '/Marketing/bulk-calling-data',
      },
      {
        component: CNavItem,
        name: 'Customer Review',
        id:'crmCustomerReview1',
        to: '/Marketing/customer-review',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Fitness',
    to: '/fitness',
    id:'crmFitness',
    icon: <CIcon icon={cilWeightlifitng} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Fitness Goal',
        id:'crmFitnessGoal',
        to: '/fitness/fitness-Goal/all-client-fitness',
      }
    ],
  },
  {
    component: CNavTitle,
    name: 'ERP',
  },
  {
    component: CNavGroup,
    name: 'Task',
    to: '/task',
    icon: <CIcon icon={cilGraph} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Task Calender',
        to: 'task/create-a-task',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Inventory',
    to: '/inventory',
    icon: <CIcon icon={cilGraph} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name:'Stock  List',
        to:'/inventory/stock-order-list'
      },
      {
        component: CNavItem,
        name: 'Stock Report',
        to: '/inventory/purchase-report ',
      },
      {
        component: CNavItem,
        name: 'Products List',
        to: '/inventory/stock-listing1',
      },
      {
        component: CNavItem,
        name: 'Stock Alert',
        to: '/inventory/stock-alert',
      },
      {
        component: CNavItem,
        name: 'Product Sales Report',
        to: '/inventory/sales-report',
      },
      {
        component: CNavItem,
        name: 'Office Inventory',
        to: '/inventory/stock-assgning',
      },
      {
        component: CNavItem,
        name: 'IMP Call List',
        to: '/inventory/all-call-list',
      },
      {
        component: CNavItem,
        name: 'Product Invoice',
        to: '/inventory/product-invoice',
      },
      
      
    ],
  },
  {
    component: CNavGroup,
    name: 'Finance',
    to: '/finance',
    icon: <CIcon icon={cilCash} customClassName="nav-icon" />,
    items: [
      {
        component: CNavGroup,
        name: 'Invoices',
        to: '/inventory',
        items: [
          {
            component: CNavItem,
            name: 'Total Invoices',
            to: '/finance/total-invoice',
          },
          {
            component: CNavItem,
            name: 'Paid Invoices',
            to: '/finance/paid-invoice',
          },
          {
            component: CNavItem,
            name: 'Balance Payment',
            to: '/finance/balance-payment',
          },
          {
            component: CNavItem,
            name: 'Receipts',
            to: '/finance/receipt',
          },
          {
            component: CNavItem,
            name: 'Cancelled Invoice',
            to: '/finance/cancel-invoice',
          },
          {
            component: CNavItem,
            name: 'Comments Of written Off Invoice',
            to: '/finance/comment-written',
          },
        ],
      },
      {
        component: CNavGroup,
        name: 'Revenues',
        to: '/inventory',
        items: [
          {
            component: CNavItem,
            name: 'Revenue Details',
            to: '/finance/revenue-details',
          },
          {
            component: CNavItem,
            name: 'Services Wise Revenue',
            to: '/finance/service-revenue',
          },
         
          {
            component: CNavItem,
            name: 'New Cilent Revenue',
            to: '/finance/newc-revenue',
          },
          {
            component: CNavItem,
            name: 'Renewals Revenue',
            to: '/finance/renew-revenue',
          },
          {
            component: CNavItem,
            name: 'Lead Report',
            to: '/finance/l-r',
          },
          {
            component: CNavItem,
            name: 'Revenue Report',
            to: '/finance/revenue-report',
          },
        ],
      },
      
        {
          component: CNavGroup,
          name: 'Collection Report',
          to: '/inventory',
          items: [
            {
              component: CNavItem,
              name: 'Total Collection',
              to: '/finance/total-c',
            },
            {
              component: CNavItem,
              name: 'Payment Mode',
              to: '/finance/payment-mode',
            },
            {
              component: CNavItem,
              name: 'Cash Report',
              to: '/finance/cash-report',
            },
            {
              component: CNavItem,
              name: 'Cheque Report',
              to: '/finance/cheque-report',
            },
          ],
        },
      {
        component: CNavGroup,
        name: 'Expense',
        to: '/inventory',
        items: [
          {
            component: CNavItem,
            name: 'Center Expense',
            to: '/finance/center-expense',
          },
          {
            component: CNavItem,
            name: 'Daily Expense',
            to: '/finance/daily-expense',
          },
          {
            component: CNavItem,
            name: 'Petty Cash ',
            to: '/finance/petty-cash',
          },
        ],
      },
      {
        component: CNavGroup,
        name: 'Sales',
        to: '/inventory',
        items: [
          {
            component: CNavItem,
            name: 'DSR Report',
            to: '/finance/dsr-report',
          },
          {
            component: CNavItem,
            name: 'Target Vs Achievment ',
            to: '/finance/targetvs-achievment',
          },
        ],
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'HR Management',
    to: '/hr',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Recuritment',
        to:'/hr/emp-recruitment',
        
      },
      {
        component: CNavGroup,
        name: 'Employee Profile',
        to: '/hr/EP',
        items:[
          {
            component: CNavItem,
            name: 'Employee Profile',
            to: '/hr/all-emp',     
          },
          {
            component: CNavItem,
            name: 'Employee Documents',
            to: '/hr/emp-document',
          },
          {
            component: CNavItem,
            name: 'Job Profile',
            to: '/hr/job-profile',
          },
        ]
      },    
        {
          component: CNavGroup,
          name: 'Emp Target Sheet',
          to: '/hr/empt',
          items: [
            {
              component: CNavItem,
              name: 'Emp Target Sheet',
              to: '/hr/emp-target-sheet'
            }, 
            {
              component: CNavItem,
              name: 'Emp Performance',
              to: '/hr/emp-performance',
            },
          ],
        },

      {
        component: CNavGroup,
        name: 'Emp  Attendess',
        to: 'hr/ea',
        items: [
          {
            component: CNavItem,
            name: 'EMP Check Ins',
            to: '/hr/daily-emp-check',
          },
          {
            component: CNavItem,
            name: 'Biometric Emp',
            to: '/hr/biometric-emp',
          },
          {
            component: CNavItem,
            name: 'EMP Attedance Register',
            to: '/hr/attendance-register',
          },
          
        ],
      },
      {
        component: CNavGroup,
        name: 'Hr Policy',
        to: '/hr/hp',
        items: [
          {
            component: CNavItem,
            name: 'Hr Policy',
            to: '/hr/hr-Policy',
          },
          {
            component:CNavItem,
            name:'Holiday List',
            to:'/hr/holyday-list'
          },
          {
            component: CNavItem,
            name: 'Shift Timing ',
            to: '/hr/shift-timing-managment',
          },           
          {
            component: CNavItem,
            name: 'EMP Joining',
            to: '/hr/emp-joining',
          },
        ],
      },

      {
        component: CNavGroup,
        name: 'Salary Sheet',
        to: '/hr/ss',
        items: [
          {
            component: CNavItem,
            name: 'Leave Setup',
            to: '/hr/leave-setup',
          },
          {
            component: CNavItem,
            name: 'Emp Salary Sheet',
            to: '/hr/salary-sheet',
          },
          {
            component: CNavItem,
            name: 'Trainer Salary Slip',
            to: '/hr/trainer-salary',
          },          
          
          {
            component: CNavItem,
            name: 'All Trainer Report',
            to: '/hr/all-class-report',
          },
        ],
      },
      {
        component: CNavItem,
        name: 'All-Rights',
        to: '/hr/all-righthr',
      }
    ],
    
  },
 
  {
    component: CNavGroup,
    name: 'Courses',
    to: '/course',
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'TTC Clients ',
        to: '/course/ttc-client-details',
      },
      {
        component: CNavItem,
        name: 'TTC Videos ',
        to: '/course/ttc-videos-details',
      },
      {
        component: CNavItem,
        name: 'TTC PDF ',
        to: '/course/ttc-pdf-details',
      },
      {
        component: CNavItem,
        name: 'Course Completion',
        to: '/course/client-certificate-details',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Masters',
  },
  {
    component: CNavItem,
    name: 'Center Setup',
    to: '/master/center-setup',
    icon: <CIcon icon={cilCenterFocus} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Support',
    to: '/master/support',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Marketing',
    to: '/master/marketing',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Lead Sources Master',
        to: '/master/marketing/leadSourceMaster',
      },
      {
        component: CNavItem,
        name: 'Sms, E-mail, Template Master',
        to: '/master/marketing/emailsmsTemplate',
      },
      {
        component: CNavItem,
        name: 'Gallery Master',
        to: '/master/marketing/galleryMaster',
      },
      {
        component: CNavItem,
        name: 'Automated Communication To staff  Master',
        to: '/base/cards',
      },
      {
        component: CNavItem,
        name: 'Automated Communication To Member  Master',
        to: '/base/cards',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Clients',
    to: '/master/clients',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Client Transfer Master',
        to: '/master/clients/client-transfer',
      },
      {
        component: CNavItem,
        name: 'Appoinment Page Master',
        to: '/master/clients/appointment-page',
      },
      {
        component: CNavItem,
        name: 'Support & Rights Master',
        to: '/master/clients/support-rights',
      },
      {
        component: CNavItem,
        name: 'Call Setup Master',
        to: '/master/clients/call-setup',
      },
      {
        component: CNavItem,
        name: 'Extension',
        to: '/master/clients/extension',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Fitness',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Body Measurement ',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Fitness Goal',
        to: '/base/breadcrumbs',
      },
      {
        component: CNavItem,
        name: 'Fitness Workout',
        to: '/base/cards',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'HR',
    to: '/master/hr',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Employee Designation',
        to: '/master/hr/designation',
      },
      {
        component: CNavItem,
        name: 'HR Policy',
        to: '/master/hr/hrPolicy',
      },
      {
        component: CNavItem,
        name: 'Holidays List',
        to: '/master/hr/holiday',
      },
      {
        component: CNavItem,
        name: 'EMP Joining',
        to: '/master/hr/emp-joining',
      },
      {
        component: CNavItem,
        name: 'Job Profile',
        to: '/master/hr/job-profile',
      },
      {
        component: CNavItem,
        name: 'Employee Document',
        to: '/master/hr/emp-doc',
      },
      {
        component: CNavItem,
        name: 'Leave Setup',
        to: '/master/hr/leave-setup',
      },
      {
        component: CNavItem,
        name: 'Salary Sheet',
        to: '/master/hr/payrol-setup',
      },
      {
        component: CNavItem,
        name: 'Shift Timing ',
        to: '/master/hr/shift-timing-management ',
      },
      {
        component: CNavItem,
        name: 'Trainer Salary Slip',
        to: '/master/hr/trainer-salary-slip',
      },
      {
        component: CNavItem,
        name: 'All right',
        to: '/master/hr/all-right',
      },
      {
        component: CNavItem,
        name: 'Emp Prformance',
        to: '/master/hr/emp-Prformance',
      },
    ],
  },

  


  {
    component: CNavGroup,
    name: 'Inverntory',
    to: '/master',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Produst Listing Master',
        to: '/master/all-produt-Listing-Master',
      },
      {
        component: CNavItem,
        name: 'Office inventory',
        to: '/master/product-assign-master',
      },

    ],
  },
  {
    component: CNavGroup,
    name: 'Finance',
    to: '/master/finance',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Expness Category',
        to: '/master/finance/expness',
      },
      {
        component: CNavItem,
        name: 'Budgeting',
        to: '/master/finance/budgeting',
      },
      {
        component: CNavItem,
        name: 'Invoice Setup Master',
        to: '/master/finance/invoice',
      },
      {
        component: CNavItem,
        name: 'Tax Setup Master',
        to: '/master/finance/tax',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Center Partners',
    to: '/master/center',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Center Partners',
        to: '/master/center-partners',
      },

    ],
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavItem,
    name: 'Colors',
    to: '/theme/colors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Typography',
    to: '/theme/typography',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },

  {
    component: CNavGroup,
    name: 'Base',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Accordion',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Breadcrumb',
        to: '/base/breadcrumbs',
      },
      {
        component: CNavItem,
        name: 'Cards',
        to: '/base/cards',
      },
      {
        component: CNavItem,
        name: 'Carousel',
        to: '/base/carousels',
      },
      {
        component: CNavItem,
        name: 'Collapse',
        to: '/base/collapses',
      },
      {
        component: CNavItem,
        name: 'List group',
        to: '/base/list-groups',
      },
      {
        component: CNavItem,
        name: 'Navs & Tabs',
        to: '/base/navs',
      },
      {
        component: CNavItem,
        name: 'Pagination',
        to: '/base/paginations',
      },
      {
        component: CNavItem,
        name: 'Placeholders',
        to: '/base/placeholders',
      },
      {
        component: CNavItem,
        name: 'Popovers',
        to: '/base/popovers',
      },
      {
        component: CNavItem,
        name: 'Progress',
        to: '/base/progress',
      },
      {
        component: CNavItem,
        name: 'Spinners',
        to: '/base/spinners',
      },
      {
        component: CNavItem,
        name: 'Tables',
        to: '/base/tables',
      },
      {
        component: CNavItem,
        name: 'Tooltips',
        to: '/base/tooltips',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Buttons',
    to: '/buttons',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Buttons',
        to: '/buttons/buttons',
      },
      {
        component: CNavItem,
        name: 'Buttons groups',
        to: '/buttons/button-groups',
      },
      {
        component: CNavItem,
        name: 'Dropdowns',
        to: '/buttons/dropdowns',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Forms',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Form Control',
        to: '/forms/form-control',
      },
      {
        component: CNavItem,
        name: 'Select',
        to: '/forms/select',
      },
      {
        component: CNavItem,
        name: 'Checks & Radios',
        to: '/forms/checks-radios',
      },
      {
        component: CNavItem,
        name: 'Range',
        to: '/forms/range',
      },
      {
        component: CNavItem,
        name: 'Input Group',
        to: '/forms/input-group',
      },
      {
        component: CNavItem,
        name: 'Floating Labels',
        to: '/forms/floating-labels',
      },
      {
        component: CNavItem,
        name: 'Layout',
        to: '/forms/layout',
      },
      {
        component: CNavItem,
        name: 'Validation',
        to: '/forms/validation',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Charts',
    to: '/charts',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Icons',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'CoreUI Free',
        to: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        component: CNavItem,
        name: 'CoreUI Flags',
        to: '/icons/flags',
      },
      {
        component: CNavItem,
        name: 'CoreUI Brands',
        to: '/icons/brands',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Notifications',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Alerts',
        to: '/notifications/alerts',
      },
      {
        component: CNavItem,
        name: 'Badges',
        to: '/notifications/badges',
      },
      {
        component: CNavItem,
        name: 'Modal',
        to: '/notifications/modals',
      },
      {
        component: CNavItem,
        name: 'Toasts',
        to: '/notifications/toasts',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Widgets',
    to: '/widgets',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]

export default _nav
