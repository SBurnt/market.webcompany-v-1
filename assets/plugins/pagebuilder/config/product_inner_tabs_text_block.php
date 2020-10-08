<?php

return [
    'title' => 'Табы текстовый (33)',

    'show_in_templates' => [213, 214, 217],

    //        'show_in_docs' => [ 2 ],

    //        'hide_in_docs' => [ 10, 63 ],

    'order' => 33,

    'container' => ['default'],

    'templates' => [
        'owner' => '
            <div class="tabs-wrap">
                [+title+]
                <div class="tabs tabScrollInit">
                    [+tabs.head+]
                </div>
                <div class="panels">
                    [+tabs.content+]
                </div>
            </div>
            ',
        'tabs' => [
            'head' => '<span data-id="tabs__[+tabs_iteration+]" class="tab [+active+]">[+header+]</span>',
            'content' => <<<EOL
<div data-id="tabs__[+tabs_iteration+]" class="panel [+active+]">
    [+content+]
</div>
EOL
        ]
    ],

    'fields' => [
        'title' => [
            'caption' => 'Заголовок блока',
            'type' => 'text',
        ],
        'tabs' => [
            'caption' => 'Вкладка (Таб)',
            'type' => 'group',
            'fields' => [
                'header' => [
                    'caption' => 'Название вкладки',
                    'type' => 'text',
                ],
                'content' => [
                    'caption' => 'Текст для данной вкладки',
                    'type' => 'richtext',
                    'default' => '',
                    'theme' => 'editor',
                    'options' => [
                        'height' => '300px',
                    ],
                ],
            ],
        ],
    ],
    'prepare' => function ($options, &$values) {
        //Активность для первого блока
        $values['tabs'][0]['active'] = 'active';

        //Заголовок
        if ($values['title'] != '') {
            $values['title'] = "<h4>{$values['title']}</h4>";
        }
    }
];
