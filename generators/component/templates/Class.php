<?php
namespace App\Components;
use App\InterfaceComponent;
<% if (hasAnimations) { -%>
use App\Traits\HasAnimations;
<% } -%>

class <%= phpClass %> implements InterfaceComponent
{
<% if (hasAnimations) { -%>
    use HasAnimations;
<% } -%>

    public function get_name()
    {
        return '<%= compName %>';
    }

    public function get_label()
    {
        return '<%= label %>';
    }

    public function get_fields()
    {
        // Copy the ACF array here.
        return array(

        );
    }
}