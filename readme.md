# CRM Lead Management System

A CRM application for managing leads with JWT authentication, built with Next.js/React and Django REST Framework.

## Project Structure

```
crm-lead-management/
├── app/                         
│   ├── layout.tsx               # Root component
│   ├── page.tsx                 # Home page (redirects to login)
│   ├── globals.css             
│   ├── config/
│   │   └── api.ts               # API endpoint configuration
│   ├── login/
│   │   └── page.tsx            
│   ├── signup/
│   │   └── page.tsx             # User registration page
│   ├── leads/
│   │   └── page.tsx             # Lead management page 
│   └── forgot-password/
│       └── page.tsx             # Password reset flow
├── backend/                    
│   ├── manage.py                
│   ├── db.sqlite3               # SQLite database
│   ├── crm_project/             
│   │   ├── settings.py          
│   │   ├── urls.py              # URL routing
│   │   ├── wsgi.py             
│   │   └── asgi.py              
│   └── leads/                   # Django app for lead management
│       ├── models.py            # Database models
│       ├── serializers.py       # DRF serializers
│       ├── views.py             # API views & endpoints
│       ├── urls.py              # App URL routing
│       └── migrations/          # Database migrations
├── .env.example                
└── README.md                   
```

## Tech Stack

**Frontend:**
- Next.js 16.1.1
- Axios 
- Vanilla CSS 

**Backend:**
- Django 6.0.1 
- Django REST Framework 
- djangorestframework-simplejwt 
- django-cors-headers 
- SQLite - Database


## Features

### Authentication
- **User Registration** - Create new accounts with email validation
- **JWT Login** - Secure token-based authentication
- **Token Refresh** - Automatic token refresh capability

### Lead Management (CRUD)
- **Create Leads** - Add new leads with name, email, phone
- **List Leads** - View all leads in a table format
- **Update Leads** - Edit lead details and status inline
- **Delete Leads** - Remove leads from database
- **Status Tracking** - Track leads through 3 statuses (New, Contacted, Qualified)

### Security
- JWT token-based authentication
- IsAuthenticated permission class on protected endpoints
- CORS enabled for frontend communication


