from django_filters import rest_framework as filters
from .models import Job

class JobsFilter(filters.FilterSet):

    #search
    keyword = filters.CharFilter(field_name='title', lookup_expr='icontains') #icontains = case insensitive
    location = filters.CharFilter(field_name='address', lookup_expr='icontains')
    # to filter with min salary 
    min_salary = filters.NumberFilter(field_name='salary' or 0, lookup_expr='gte') #gte = greater than or equal to
    max_salary = filters.NumberFilter(field_name='salary' or 1000000, lookup_expr='lte') #lte = less than or equal to

    class Meta:
        model = Job
        fields = (
            'keyword',
            'location',
            'title',
            'education',
            'industry',
            'experience',
            'jobtype',
            'min_salary',
            'max_salary',
        )

