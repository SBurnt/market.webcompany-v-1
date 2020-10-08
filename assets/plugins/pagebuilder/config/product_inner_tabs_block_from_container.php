<?php

return [
    'title' => 'Табы (получение данных с блока "Табы в PageBuilder") (35)',

    'show_in_templates' => [213, 214, 217],

    //        'show_in_docs' => [ 2 ],

    //        'hide_in_docs' => [ 10, 63 ],

    'order' => 35,

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

        $doc_id = $this->modx->documentIdentifier;
        $snippet_name = 'PageBuilder';
        $snippet_params = [
            'docid' => $doc_id,
            'offset' => '0',
            'limit' => '100',
            'container' => 'tabs',
            'renderTo' => 'array'
        ];

        $a_tabs = $this->modx->runSnippet($snippet_name, $snippet_params, 3600, 'tabs_block_v2');
        $a_title = array_column($a_tabs[0], 'title');
        $tabs_count = count($a_title);

        if ($tabs_count > 0) {
            $i = 1;
            //Генерируем заголовки
            //            var_ dump($a_title);
            foreach ($a_title as $tab_title) {
                //Задаем класс для первого элемента
                if ($i === 1) {
                    $active = 'active';
                } else {
                    $active = '';
                }

                //Получение и вывод заголовков
                if (!empty($tab_title)) {
                    $tabs_head .= "<span data-id=\"tabs__{$i}\" class=\"tab {$active}\">{$tab_title}</span>";
                    $tabs_head .= PHP_EOL;
                }

                //Получение и вывод блоков
                $block_nmr = $i - 1;
                $snippet_name = 'PageBuilder';
                $snippet_params = [
                    'docid' => $doc_id,
                    'offset' => $block_nmr,
                    'limit' => '1',
                    'container' => 'tabs',
                ];
                $cache_name = 'tabs_block_val_' . $doc_id . '_' . $block_nmr;
                $tab_val = $this->modx->runSnippet($snippet_name, $snippet_params, 3600, $cache_name);
                $tabs_panels .= <<<EOL
        <div data-id="tabs__{$i}" class="panel {$active}">
        {$tab_val}
        </div>
EOL;
                $tabs_panels .= PHP_EOL;
                $i++;
            }
        }
        $values['tabs_head'] = $tabs_head;
        $values['tabs_panels'] = $tabs_panels;
        unset($tabs, $tabs_head, $tabs_panels, $i, $tab_val, $tab_title, $block_nmr, $snippet_name, $snippet_params);
    }
];
