<?php

return array(
    'name' => '<%= compName %>',
    'label' => '<%= label %>',
    'acf' => array(
        'key' => 'group_<%= compName %>',
        'title' => '<%= label %>',
        'fields' => array(
            array(
                'key' => 'field_5bdb35a44e72e',
                'label' => 'Content',
                'name' => '',
                'type' => 'tab',
                'instructions' => '',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                ),
                'placement' => 'left',
                'endpoint' => 0,
            ),

            \App\Component::get_design_fields(),
            \App\Component::get_settings_fields(),
        ),
    ),
);