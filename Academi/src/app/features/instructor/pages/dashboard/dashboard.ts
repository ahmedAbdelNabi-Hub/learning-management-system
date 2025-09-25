import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  basicData: any;
  basicOptions: any;
  data: any;
  options: any;

  ngOnInit() {
    // ========= 1) Bar Chart: الطلاب والكورسات =========
    this.basicData = {
      labels: [
        'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
        'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
      ],
      datasets: [
        {
          label: 'عدد الطلاب',
          backgroundColor: 'rgba(0, 181, 121, 0.7)',
          borderRadius: 6,
          data: [25, 15, 15, 25, 25, 25, 25, 32, 26, 34, 33, 35]
        },
        {
          label: 'عدد الكورسات',
          backgroundColor: 'rgba(116, 254, 190, 0.7)',
          borderRadius: 6,
          data: [20, 10, 10, 20, 20, 20, 20, 30, 20, 32, 30, 30]
        }
      ]
    };

    this.basicOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: '#1f2937',
            font: {
              size: 14,
              weight: '600'
            }
          }
        }
      },
      scales: {
        x: {
          ticks: { color: '#6b7280', font: { size: 12, weight: '500' } },
          grid: { display: false }
        },
        y: {
          ticks: { color: '#6b7280', font: { size: 12 } },
          grid: { color: 'rgba(229, 231, 235, 0.5)' }
        }
      }
    };

    // ========= 2) Line Chart: معدل الحضور والإنجاز =========
    this.data = {
      labels: [
        'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
        'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
      ],
      datasets: [
        {
          label: 'معدل الحضور %',
          data: [88, 90, 92, 89, 93, 95, 94, 96, 92, 91, 93, 97],
          borderColor: '#40a5fe',
          tension: 0.4,
          fill: true,
          backgroundColor: 'rgba(64,165,254,0.2)', // 👈 fill color with opacity
          pointBackgroundColor: '#40a5fe',
          pointRadius: 3,
          pointHoverRadius: 8
        },
        {
          label: 'معدل إنجاز الواجبات %',
          data: [70, 74, 78, 80, 82, 85, 87, 89, 90, 92, 93, 95],
          fill: true,
          borderColor: '#74febe',
          tension: 0.4,
          backgroundColor: 'rgba(116,254,190,0.2)', // 👈 transparent green
          pointBackgroundColor: '#74febe',
          pointRadius: 3,
          pointHoverRadius: 8
        }
      ]
    };

    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: '#1f2937',
            font: { size: 14, weight: '600' }
          }
        },
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(17, 24, 39, 0.95)',
          titleColor: '#f9fafb',
          bodyColor: '#e5e7eb',
          borderColor: 'rgba(75, 85, 99, 0.3)',
          borderWidth: 1,
          cornerRadius: 10,
          padding: 10
        }
      },
      scales: {
        x: {
          ticks: { color: '#6b7280' },
          grid: {
            color: 'rgba(200,200,200,0.2)', // خطوط خفيفة
            drawTicks: true,
            backgroundColor: (ctx: any) => ctx.index % 2 === 0
              ? 'rgba(64,165,254,0.05)'   // خلفية فاتحة متكررة
              : 'rgba(255,255,255,0.0)'   // شفافة
          }
        },
        y: {
          min: 60,
          max: 100,
          ticks: {
            color: '#6b7280',
            callback: (value: number) => value + '%'
          },
          grid: {
            color: 'rgba(200,200,200,0.3)',
            backgroundColor: (ctx: any) => ctx.tick.value % 10 === 0
              ? 'rgba(116,254,190,0.05)'
              : undefined
          }
        }
      }
    };

  }
}
