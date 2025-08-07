<?php 

acf_add_local_field_group([
    'key' => 'group_our_latest_impact',
    'title' => 'Our Latest Impact Block',
    'fields' => [
        [
            'key' => 'field_header_section',
            'label' => 'Section Header',
            'name' => 'header_section',
            'type' => 'group',
            'sub_fields' => [
                [
                    'key' => 'field_hero_title',
                    'label' => 'Titre Hero',
                    'name' => 'hero_title',
                    'type' => 'text',
                    'default_value' => 'Our latest impact',
                    'placeholder' => 'Ex: Our latest impact'
                ],
                [
                    'key' => 'field_hero_subtitle',
                    'label' => 'Sous-titre Hero',
                    'name' => 'hero_subtitle',
                    'type' => 'textarea',
                    'placeholder' => 'Description du bloc...',
                    'rows' => 3
                ],
                [
                    'key' => 'field_cta_buttons',
                    'label' => 'Boutons CTA',
                    'name' => 'cta_buttons',
                    'type' => 'repeater',
                    'max' => 2,
                    'sub_fields' => [
                        [
                            'key' => 'field_button_link',
                            'label' => 'Bouton',
                            'name' => 'button_link',
                            'type' => 'link',
                            'required' => 0
                        ]
                    ]
                ]
            ]
        ],
        
        [
            'key' => 'field_cards_repeater',
            'label' => 'Cartes d\'articles',
            'name' => 'cards_repeater',
            'type' => 'repeater',
            'sub_fields' => [
                [
                    'key' => 'field_selected_article',
                    'label' => 'Article à afficher',
                    'name' => 'selected_article',
                    'type' => 'post_object',
                    'post_type' => ['insights', 'case-studies'],
                    'return_format' => 'id',
                    'ui' => 1,
                    'required' => 1
                ],
                [
                    'key' => 'field_card_type',
                    'label' => 'Type de carte',
                    'name' => 'card_type',
                    'type' => 'select',
                    'choices' => [
                        'single' => 'Carte simple',
                        'double' => 'Carte double',
                        'full' => 'Carte pleine largeur'
                    ],
                    'default_value' => 'single',
                    'required' => 1
                ],
                [
                    'key' => 'field_card_decaled',
                    'label' => 'Carte décalée',
                    'name' => 'card_decaled',
                    'type' => 'true_false',
                    'ui' => 1,
                    'ui_on_text' => 'Oui',
                    'ui_off_text' => 'Non',
                    'conditional_logic' => [
                        [
                            [
                                'field' => 'field_card_type',
                                'operator' => '!=',
                                'value' => 'full'
                            ]
                        ]
                    ]
                ]
            ]
        ]
    ]
]);?>
