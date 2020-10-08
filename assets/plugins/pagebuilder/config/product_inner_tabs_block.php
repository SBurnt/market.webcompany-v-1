<?php

return [
    'title' => 'Табы (получение данных с блоков PageBuilder других страниц) (34)',

    'show_in_templates' => [213, 214, 217],

    //        'show_in_docs' => [ 2 ],

    //        'hide_in_docs' => [ 10, 63 ],

    'order' => 34,

    'container' => ['default'],

    'templates' => [
        'owner' => '
            <div class="tabs-wrap">
                [+title+]
                <div class="tabs tabScrollInit">
                    [+tabs_head+]
                </div>
                <div class="panels">
                    [+tabs_panels+]
                </div>
            </div>
            '
    ],

    'fields' => [
        'title' => [
            'caption' => 'Заголовок блока',
            'type' => 'text',
        ],
        'tabs' => [
            'caption' => 'Вкладка (информация задается с другой страницы)',
            'type' => 'group',
            'fields' => [
                'header' => [
                    'caption' => 'Название вкладки',
                    'type' => 'text',
                ],
                'page_id' => [
                    'caption' => 'id страницы с требуемыми блоками',
                    'type' => 'text',
                ],
                'block_nmr' => [
                    'caption' => 'Номер блока (отсчет с единицы)',
                    'type' => 'text',
                ],
            ],
        ],
    ],
    'prepare' => function ($options, &$values) {
        //Заголовок
        if ($values['title'] != '') {
            $values['title'] = "<h4>{$values['title']}</h4>";
        }
        //Получение данных ресурса
        $values['tabs_head'] = '';
        $values['tabs_panels'] = '';
        $tabs_head = '';
        $tabs_panels = '';
        $i = 1;
        $active = '';
        $tab_val = '';

        //Генерируем содержимое табов
        foreach ($values['tabs'] as &$tabs) {
            //Задаем класс для первого элемента
            if ($i === 1) {
                $active = 'active';
            } else {
                $active = '';
            }

            //Получение и вывод заголовков
            if (!empty($tabs['header'])) {
                $tabs_head .= "<span data-id=\"tabs__{$i}\" class=\"tab {$active}\">{$tabs['header']}</span>";
                $tabs_head .= PHP_EOL;
            }

            if (!empty($tabs['page_id']) && !empty($tabs['block_nmr'])) {
                $block_nmr = $tabs['block_nmr'] - 1;
                $snippet_name = 'PageBuilder';
                $snippet_params = [
                    'docid' => $tabs['page_id'],
                    'offset' => $block_nmr,
                    'limit' => '1'
                ];
                //Вывод блока
                $tab_val = $this->modx->runSnippet($snippet_name, $snippet_params, 3600, 'tabs_block');
                $tabs_panels .= <<<EOL
<div data-id="tabs__{$i}" class="panel {$active}">
    {$tab_val}
</div>
EOL;
                $tabs_panels .= PHP_EOL;
            }

            $i++;
        }
        $values['tabs_head'] = $tabs_head;
        $values['tabs_panels'] = $tabs_panels;
        unset($tabs, $tabs_head, $tabs_panels, $i, $tab_val);
    }
];
