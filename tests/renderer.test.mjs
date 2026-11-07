import test from 'node:test';
import assert from 'node:assert/strict';
import {clipNear} from '../dist/software-renderer.js';
test('software fallback clips surfaces that cross camera near plane',()=>{const p=clipNear([[0,0,-1],[1,0,1],[0,1,-1]],.1);assert.ok(p.length>=3);assert.ok(p.every(v=>v[2]<=-.099999));});
test('surfaces entirely behind viewer do not render',()=>{assert.deepEqual(clipNear([[0,0,1],[1,0,1],[0,1,1]],.1),[]);});
