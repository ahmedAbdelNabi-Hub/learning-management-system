import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Header } from '../header/header.component';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
  expanded?: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule, Header],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebart {
  // حالة الـ Sidebar
  isCollapsed = signal<boolean>(false);
  expandedMenus = signal<Set<string>>(new Set());

  // عناصر القائمة
  menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: 'bx bx-grid-alt', route: '/dashboard' },

    {
      id: 'courses',
      label: 'الكورسات',
      icon: 'bx bx-book',
      children: [
        { id: 'my-courses', label: 'كورساتي', icon: 'bx bx-book-open', route: '/courses/my-courses' },
        { id: 'create-course', label: 'إنشاء كورس', icon: 'bx bx-plus-circle', route: '/courses/create' },
        { id: 'drafts', label: 'المسودات', icon: 'bx bx-edit-alt', route: '/courses/drafts' },
        { id: 'archived', label: 'الأرشيف', icon: 'bx bx-archive', route: '/courses/archived' },
        { id: 'categories', label: 'التصنيفات', icon: 'bx bx-category', route: '/courses/categories' }
      ]
    },

    {
      id: 'students',
      label: 'الطلاب',
      icon: 'bx bx-user',
      children: [
        { id: 'all-students', label: 'جميع الطلاب', icon: 'bx bx-group', route: '/students/all' },
        { id: 'top-performers', label: 'الطلاب المتميزون', icon: 'bx bx-medal', route: '/students/top' },
        { id: 'at-risk', label: 'طلاب متعثرون', icon: 'bx bx-error', route: '/students/at-risk' },
        { id: 'attendance', label: 'الحضور', icon: 'bx bx-calendar-check', route: '/students/attendance' },
        { id: 'enrollments', label: 'التسجيلات', icon: 'bx bx-check-circle', route: '/students/enrollments' }
      ]
    },

    {
      id: 'crm',
      label: 'التواصل',
      icon: 'bx bx-message-rounded',
      children: [
        { id: 'inbox', label: 'البريد الوارد', icon: 'bx bx-inbox', route: '/crm/inbox' },
        { id: 'broadcast', label: 'رسائل جماعية', icon: 'bx bx-broadcast', route: '/crm/broadcast' },
        { id: 'notes', label: 'ملاحظات الطلاب', icon: 'bx bx-note', route: '/crm/notes' },
        { id: 'tasks', label: 'المهام والتذكيرات', icon: 'bx bx-task', route: '/crm/tasks' },
        { id: 'segments', label: 'التقسيم والفلاتر', icon: 'bx bx-filter', route: '/crm/segments' }
      ]
    },

    {
      id: 'assignments',
      label: 'الواجبات والاختبارات',
      icon: 'bx bx-file',
      children: [
        { id: 'pending-review', label: 'بانتظار المراجعة', icon: 'bx bx-time', route: '/assignments/pending' },
        { id: 'graded', label: 'تم التصحيح', icon: 'bx bx-check-circle', route: '/assignments/graded' },
        { id: 'question-bank', label: 'بنك الأسئلة', icon: 'bx bx-question-mark', route: '/assignments/questions' },
        { id: 'quiz-analytics', label: 'تحليلات الاختبارات', icon: 'bx bx-bar-chart', route: '/assignments/analytics' }
      ]
    },

    {
      id: 'reports',
      label: 'التقارير والتحليلات',
      icon: 'bx bx-pie-chart',
      children: [
        { id: 'student-progress', label: 'تقدم الطلاب', icon: 'bx bx-trending-up', route: '/reports/progress' },
        { id: 'course-performance', label: 'أداء الكورسات', icon: 'bx bx-target-lock', route: '/reports/performance' },
        { id: 'revenue-reports', label: 'تقارير الأرباح', icon: 'bx bx-dollar-circle', route: '/reports/revenue' },
        { id: 'engagement', label: 'تحليلات التفاعل', icon: 'bx bx-analyse', route: '/reports/engagement' }
      ]
    },

    {
      id: 'live-sessions',
      label: 'الجلسات المباشرة',
      icon: 'bx bx-video',
      children: [
        { id: 'schedule-session', label: 'جدولة جلسة', icon: 'bx bx-calendar', route: '/live/schedule' },
        { id: 'join-session', label: 'الانضمام للجلسة', icon: 'bx bx-video-recording', route: '/live/join' },
        { id: 'past-sessions', label: 'الجلسات السابقة', icon: 'bx bx-history', route: '/live/history' }
      ]
    },

    {
      id: 'certificates',
      label: 'الشهادات',
      icon: 'bx bx-certification',
      children: [
        { id: 'templates', label: 'القوالب', icon: 'bx bx-layout', route: '/certificates/templates' },
        { id: 'issue', label: 'إصدار الشهادات', icon: 'bx bx-award', route: '/certificates/issue' },
        { id: 'student-certs', label: 'شهادات الطلاب', icon: 'bx bx-badge-check', route: '/certificates/student' }
      ]
    },

    {
      id: 'settings',
      label: 'الإعدادات',
      icon: 'bx bx-cog',
      children: [
        { id: 'profile', label: 'الملف الشخصي', icon: 'bx bx-user-circle', route: '/settings/profile' },
        { id: 'notifications', label: 'الإشعارات', icon: 'bx bx-bell', route: '/settings/notifications' },
        { id: 'integrations', label: 'التكاملات', icon: 'bx bx-link', route: '/settings/integrations' },
        { id: 'branding', label: 'الهوية البصرية', icon: 'bx bx-paint', route: '/settings/branding' }
      ]
    }
  ];

  sidebarWidth = computed(() => this.isCollapsed() ? 'w-0' : 'w-64');

  constructor(private router: Router) { }

  toggleSidebar(): void {
    this.isCollapsed.update(c => !c);
    if (this.isCollapsed()) this.expandedMenus.set(new Set());
  }

  toggleMenu(menuId: string): void {
    if (this.isCollapsed()) return;
    this.expandedMenus.update(expanded => {
      const newExpanded = new Set(expanded);
      newExpanded.has(menuId) ? newExpanded.delete(menuId) : newExpanded.add(menuId);
      return newExpanded;
    });
  }

  isMenuExpanded(menuId: string): boolean {
    return this.expandedMenus().has(menuId);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  logout(): void {
    console.log('تسجيل خروج...');
    this.router.navigate(['/login']);
  }

  onMenuItemClick(item: MenuItem): void {
    item.route ? this.navigateTo(item.route) : item.children && this.toggleMenu(item.id);
  }

  onChildMenuClick(childItem: MenuItem): void {
    childItem.route && this.navigateTo(childItem.route);
  }
}
