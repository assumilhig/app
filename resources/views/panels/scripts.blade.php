{{-- Vendor Scripts --}}
<script src="{{ asset(mix('vendors/js/vendors.min.js')) }}"></script>
<script src="{{ asset(mix('vendors/js/ui/prism.min.js')) }}"></script>
@yield('vendor-script')
{{-- Theme Scripts --}}
<script src="{{ asset(mix('js/core/menu.js')) }}"></script>
<script src="{{ asset(mix('js/core/app.js')) }}"></script>
{{-- page script --}}
@yield('page-script')
{{-- page script --}}
